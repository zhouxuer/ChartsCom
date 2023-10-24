// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库，相机控件OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// HTML标签相关代码
import { tag, labelRenderer } from './tag3D.js';
// 引入封装边界线
import { 边界线 } from './line.js';
// 引入拉伸网格模型生成
import { ExtrudeMesh } from './ExtrudeMesh.js';


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
const lineGroup = new THREE.Group(); // 边界线组 底部
mapGroup.add(lineGroup);
const meshGroup = new THREE.Group(); // 轮廓Mesh组
mapGroup.add(meshGroup);
const lineGroup2 = new THREE.Group();// 边界线组 顶部
mapGroup.add(lineGroup2);
lineGroup.position.z = -0.01; // 适当偏移解决深度冲突
lineGroup2.position.z = 0.01; // 适当偏移解决深度冲突
// mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
// const mapHeight = 0.8; // 拉伸高度
// lineGroup.position.z = mapHeight + mapHeight * 0.1; // 适当偏移解决深度冲突


// 加载./gdp.json，结构和world.json 一样，省份对应国家
loader.load('./Three3D/map3d/mapDemo3/gdp.json', function (data) {
  const gdpObj = {}; // 每个省份的名字作为属性，属性值是国家对应GDP
  // GDP最高对应红色，GDP最低对应白色
  const color1 = new THREE.Color(0xffffff);
  const color2 = new THREE.Color(0xff0000);
  const gdpMax = 120000 // 设置一个基准值,以最高的广东gdp为准
  data.arr.forEach(function (obj) {
    const gdp = obj.value; // 当前省份GDP
    gdpObj[obj.name] = gdp; // 每个省份的名字作为属性，属性值是国家对应GDP
  })

  // 加载./china.json，结构和world.json 一样，省份对应国家
  loader.load('./Three3D/map3d/mapDemo3/china.json', function (data2) {
    // 访问所有省份边界坐标数据：data.features
    data2.features.forEach(function (area) {
      // "Polygon"：省份area有一个封闭轮廓
      // "MultiPolygon"：省份area有多个封闭轮廓
      if (area.geometry.type === 'Polygon') {
        // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
        area.geometry.coordinates = [area.geometry.coordinates];
      }
      const name = area.properties.name; // 省份名
      let height = null
      let mesh = null
      if (name) {
        // height：行政区轮廓拉伸高度，和gdp大小正相关，不过注意相机渲染范围(或者说地图尺寸范围)
        height = gdpObj[name] / 10000; // 拉伸高度
        mesh = ExtrudeMesh(area.geometry.coordinates, height)
        mesh.name = name; // 设置mesh对应的省份名字
        meshGroup.add(mesh); // 省份轮廓拉伸Mesh插入组对象mapGroup
        // 颜色插值计算
        const color = color1.clone().lerp(color2.clone(), gdpObj[mesh.name] / gdpMax);
        mesh.material.color.copy(color);
      }
      if (name) {
        const tag3D = tag(mesh.name);
        const center = area.properties.center; // 行政区几何中心经纬度坐标
        tag3D.position.set(center[0], center[1], height + 0.01)
        // 缩放CSS3DObject模型对象
        tag3D.scale.set(0.04, 0.04, 0.04); // 根据相机渲染范围适当缩放
        // tag3D.rotateX(Math.PI / 2); // 从XOY平面旋转到XOZ平面
        scene.add(tag3D);
      }

      // 解析所有封闭轮廓边界坐标area.geometry.coordinates
      const line = 边界线(area.geometry.coordinates);
      lineGroup.add(line); // 省份边界轮廓插入组对象lineGroup
      const line2 = line.clone();
      line2.position.z = height; // 顶部边界线跟随轮廓拉伸高度保持一致
      lineGroup2.add(line2);
    });
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

export {renderer, labelRenderer};