// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库，相机控件OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// HTML标签相关代码
import { tag, labelRenderer } from './tag.js';
// 引入封装边界线
import { 边界线 } from './line.js';
// 引入封装面生成
import { shapeMesh } from './shapeMesh.js';
// 引入拉伸网格模型生成 ===
// import { ExtrudeMesh } from './ExtrudeMesh.js';


/**
* 创建场景对象Scene
*/
const scene = new THREE.Scene();

// three.js文件加载类FileLoader：封装了XMLHttpRequest
const loader = new THREE.FileLoader();
loader.setResponseType('json');
// 组对象mapGroup是所有国家边界Line模型的父对象
const mapGroup = new THREE.Group();
scene.add(mapGroup);
const lineGroup = new THREE.Group(); // 边界线组
mapGroup.add(lineGroup);
const meshGroup = new THREE.Group(); // 轮廓Mesh组
mapGroup.add(meshGroup);
// mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
// const mapHeight = 0.8; // 拉伸高度 ===
// lineGroup.position.z = mapHeight + mapHeight * 0.1; // 适当偏移解决深度冲突 ===
lineGroup.position.z += 0.1; // 适当偏移解决深度冲突

//  加载./gdp.json，结构和world.json 一样，省份对应国家
loader.load('./Three3D/map3d/mapDemo2/gdp.json', function (data2) {
  const gdpObj = {}; // 每个省份的名字作为属性，属性值是国家对应GDP
  // GDP最高对应红色，GDP最低对应白色
  const color1 = new THREE.Color(0xffffff);
  const color2 = new THREE.Color(0xff0000);
  const gdpMax = 110000 // 设置一个基准值,以最高的广东gdp为准
  data2.arr.forEach(function (obj) {
    const gdp = obj.value; // 当前省份GDP
    gdpObj[obj.name] = gdp; // 每个省份的名字作为属性，属性值是国家对应GDP
  })
  //  加载./china.json，结构和world.json 一样，省份对应国家
  loader.load('./Three3D/map3d/mapDemo2/china.json', function (data) {
    // 访问所有省份边界坐标数据：data.features
    data.features.forEach(function (area) {
      // "Polygon"：省份area有一个封闭轮廓
      // "MultiPolygon"：省份area有多个封闭轮廓
      if (area.geometry.type === 'Polygon') {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        area.geometry.coordinates = [area.geometry.coordinates];
      }
      // 解析所有封闭轮廓边界坐标area.geometry.coordinates
      lineGroup.add(边界线(area.geometry.coordinates)); // 省份边界轮廓插入组对象mapGroup
      const mesh = shapeMesh(area.geometry.coordinates);
      // const mesh = ExtrudeMesh(area.geometry.coordinates, 0.8); ===
      mesh.name = area.properties.name; // 设置mesh对应的省份名字
      meshGroup.add(mesh); // 省份轮廓Mesh插入组对象mapGroup
      // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
      // meshGroup.add(ExtrudeMesh(area.geometry.coordinates, mapHeight));// 省份轮廓拉伸Mesh插入组对象mapGroup
      // 当前省份mesh对应的gdp
      const gdp = gdpObj[mesh.name];
      // 颜色插值计算
      const color = color1.clone().lerp(color2.clone(), gdp / gdpMax);
      // console.log(gdp / gdpMax)
      mesh.material.color.copy(color);
      mesh.gdp = gdp; // mesh自定义一个gdp属性，用于标签设置
      mesh.经纬度 = area.properties.center; // 用于控制标签位置
      mesh.color = color; // 记录下自身的颜色，以便选中改变mesh颜色的时候，不选中状态再改变回来

      // 地图底部边界线 ===
      // const lineGroup2 = lineGroup.clone();
      // mapGroup.add(lineGroup2);
      // lineGroup2.position.z = -mapHeight * 0.1; // 适当偏移解决深度冲突
    });
    // 地图底部边界线 ===
    // const lineGroup2 = lineGroup.clone();
    // mapGroup.add(lineGroup2);
    // lineGroup2.position.z = -mapHeight * 0.1; // 适当偏移解决深度冲突
  })
})
  // three.js辅助坐标系
  const axesHelper = new THREE.AxesHelper(300);
  scene.add(axesHelper);


/**
* 光源设置
*/
// 平行光1
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
// 环境光
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

/**
* 相机设置
*/
const width = 1360; // 窗口宽度
const height = 800; // 窗口高度
const k = width / height; // 窗口宽高比
// var s = 200;
const s = 15;// 根据包围盒大小(行政区域经纬度分布范围大小)设置渲染范围
// 创建相机对象
const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
// camera.position.set(200, 300, 200); //设置相机位置
// camera.position.set(104, 35, 200); //沿着z轴观察
// 通过OrbitControls在控制台打印相机位置选择一个合适的位置
camera.position.set(104, -105, 200);
camera.lookAt(104, 35, 0); // 指向中国地图的几何中心


/**
 * 创建渲染器对象
 */
// 创建渲染器对象
const renderer = new THREE.WebGLRenderer({
  // 启用抗锯齿属性，默认false
  antialias: true
});
// 设置渲染区域尺寸
renderer.setSize(width, height);
// 获取你屏幕对应的设备像素比.devicePixelRatio告诉threejs,以免渲染模糊问题
renderer.setPixelRatio(window.devicePixelRatio);
// // 设置背景颜色
renderer.setClearColor('#1E2A34', 0.8); // 设置背景颜色(颜色，透明度)
// // document.body.appendChild(renderer.domElement); //body元素中插入canvas对象


// 渲染函数
function render() {
  // 内容更改重新渲染画布内容，执行渲染操作
  renderer.render(scene, camera) // 周期性执行相机的渲染功能，更新canvas画布上的内容
  labelRenderer.render(scene, camera)
  // 请求再次执行渲染函数render，渲染下一帧
  requestAnimationFrame(render);
}
// 动画函数
render();

// 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
// new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
// 相机控件与.lookAt()无效( .target属性 )
controls.target.set(104, 35, 0);
controls.update(); // update()函数内会执行camera.lookAt(controls.target)


/**
* 射线投射器`Raycaster`的射线拾取选中网格模型对象函数choose()
* 选中的网格模型变为半透明效果
*/
const label = tag();
scene.add(label); // 标签插入场景中
console.log(label);
let chooseMesh = null; // 标记鼠标拾取到的mesh
function choose(event) {
  if (chooseMesh) {
    // 把上次选中的mesh设置为原来的颜色
    chooseMesh.material.color.copy(chooseMesh.color);
  } else {
    label.element.style.visibility = 'hidden'; // 没有选中mesh，隐藏标签
  }

  // 根据id获取模块
  const mapDox = document.getElementById('map3d2')
  // 容器顶点坐标
  const Sx = event.clientX - mapDox.getBoundingClientRect().left; // 鼠标单击位置横坐标
  const Sy = event.clientY - mapDox.getBoundingClientRect().top; // 鼠标单击位置纵坐标

  // 屏幕坐标转WebGL标准设备坐标（width，height，容器大小 ）
  const x = (Sx / width) * 2 - 1; // WebGL标准设备横坐标
  const y = -(Sy / height) * 2 + 1; // WebGL标准设备纵坐标

  // 创建一个射线投射器`Raycaster`
  const raycaster = new THREE.Raycaster();
  // 通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  // 返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  const intersects = raycaster.intersectObjects(meshGroup.children);
  // console.log('射线器返回的对象', intersects);
  // console.log("射线投射器返回的对象 点point", intersects[0].point);
  // console.log("射线投射器的对象 几何体",intersects[0].object.geometry.vertices)
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    chooseMesh = intersects[0].object;
    chooseMesh.material.color.set(0x00ffff);// 选中改变颜色
    label.position.set(chooseMesh.经纬度[0], chooseMesh.经纬度[1], 0);
    label.element.innerHTML = chooseMesh.name + 'GDP：' + chooseMesh.gdp + '亿元';
    label.element.style.visibility = 'visible';
  } else {
    chooseMesh = null;
  }
}

// addEventListener('click', choose); // 监听窗口鼠标单击事件
addEventListener('mousemove', choose); // 监听窗口鼠标划过事件

export {renderer, labelRenderer};