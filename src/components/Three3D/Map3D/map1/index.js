// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库，相机控件OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// HTML标签相关代码
import { tag, labelRenderer } from './tag.js';
// 引入dat.gui.js的一个类GUI
// import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
// 引入封装边界线
import { 边界线 } from './line.js';
// 引入封装面生成
// import { shapeMesh } from './shapeMesh.js';
// 引入拉伸网格模型生成
import { ExtrudeMesh } from './ExtrudeMesh.js';
// 引入城市点网格
import { cityPointMesh } from './cityPointMesh.js';
import { ConeMesh } from './ConeMesh.js';

// /**
//  * 实例化一个gui对象
//  */
// const gui = new GUI();
// // 改变交互界面style属性
// gui.domElement.style.right = '0px';
// gui.domElement.style.width = '300px';


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
const mapHeight = 0.8; // 拉伸高度
lineGroup.position.z = mapHeight + mapHeight * 0.1; // 适当偏移解决深度冲突

// const cityPointGroup = new THREE.Group(); // 所有城市标注的动态光圈组对象
// mapGroup.add(cityPointGroup);
// cityPointGroup.position.z = mapHeight + mapHeight * 0.01;

//  加载./china.json，结构和world.json 一样，省份对应国家
loader.load('./Three3D/map3d/mapDemo1/china.json', function (data) {
  // 访问所有省份边界坐标数据：data.features
  data.features.forEach(function (area) {
    // "Polygon"：省份area有一个封闭轮廓
    // "MultiPolygon"：省份area有多个封闭轮廓
    if (area.geometry.type === 'Polygon') {
      // 把"Polygon"和"MultiPolygon"的geometry.coordinates数据结构处理为一致
      area.geometry.coordinates = [area.geometry.coordinates];
    }
    // 解析所有封闭轮廓边界坐标area.geometry.coordinates
    lineGroup.add(边界线(area.geometry.coordinates));// 省份边界轮廓插入组对象mapGroup
    // mapHeight：根据行政区尺寸范围设置，比如高度设置为地图尺寸范围的2%、5%等，过小感觉不到高度，过大太高了
    meshGroup.add(ExtrudeMesh(area.geometry.coordinates, mapHeight));// 省份轮廓拉伸Mesh插入组对象mapGroup

    // 地图底部边界线
    const lineGroup2 = lineGroup.clone();
    mapGroup.add(lineGroup2);
    lineGroup2.position.z = -mapHeight * 0.1; // 适当偏移解决深度冲突
  });
  // 地图底部边界线
  const lineGroup2 = lineGroup.clone();
  mapGroup.add(lineGroup2);
  lineGroup2.position.z = -mapHeight * 0.1; // 适当偏移解决深度冲突
})

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
 * 创建一个三维坐标轴
 */
 const axesHelper = new THREE.AxesHelper(300)
 // 把坐标轴对象添加到三维场景中
 scene.add(axesHelper)


/**
 * 创建GUI界面
 */
// 添加分组
// const positions = gui.addFolder('位置');
// // 默认关闭
// positions.close()
// // 通过GUI改变mesh.position对象的xyz属性
// positions.add(mesh.position, 'x', 0, 100).name('x轴').step(5)
// positions.add(mesh.position, 'y', 0, 100).name('y轴').step(5)
// positions.add(mesh.position, 'z', 0, 100).name('z轴').step(5)
// .addColor()生成颜色值改变的交互界面
// const obj = {
//   color: '#0ff',
//   specular: '#ff1',
//   bool: false
// }
// const materials = gui.addFolder('材质')
// // 默认关闭
// materials.close()
// // .addColor()生成颜色值改变的交互界面
// materials.addColor(obj, 'color').onChange(function(value) {
//   mesh.material.color.set(value);
// });
// materials.addColor(obj, 'specular').onChange(function(value) {
//   mesh.material.specular.set(value);
// });


/**
 * 光源设置
 */
// 点光源
// const point = new THREE.PointLight('#fff', 2);
// // 光源位置
// point.position.set(40, 250, 300);
// // 添加光源到场景
// scene.add(point);
// // 通过GUI改变pointLight对象的光源强度属性
// const parallelLight = gui.addFolder('点光源')
// // 默认关闭
// parallelLight.close()
// // 通过GUI改变directionalLight对象的光源强度属性
// parallelLight.add(point, 'intensity', 0, 2).name('点光源强度')
// // 位置
// const parallelLightPosition = parallelLight.addFolder('点光源位置')
// // 默认关闭
// parallelLightPosition.close()
// parallelLightPosition.add(point.position, 'x', -400, 400)
// parallelLightPosition.add(point.position, 'y', -400, 400)
// parallelLightPosition.add(point.position, 'z', -400, 400)

// // 环境光
// const ambient = new THREE.AmbientLight('#fff', 1);
// // 添加环境光到场景
// scene.add(ambient);
// // 通过GUI改变ambient对象的光源强度属性
// const ambientLight = gui.addFolder('环境光')
// // 默认关闭
// ambientLight.close()
// // 通过GUI改变ambient对象的光源强度属性
// ambientLight.add(ambient, 'intensity', 0, 1).name('环境光强度')

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


// 设置文本标签界面大小
labelRenderer.setSize(width, height);
// 标注郑州市，（标签名称，x，y，高度偏移）
scene.add(tag('郑州市', 113.4668, 33.8818, 4.5));
// 标注南京市
scene.add(tag('南京市', 120.0586, 32.915, mapHeight));
// /**
//     * 创建div元素(作为立方体标签)
//     */
//  const div = document.createElement('div');
//  div.innerHTML = '郑州市';
//  div.style.padding = '5px 10px';
//  div.style.color = '#fff';
//  div.style.fontSize = '12px';
//  div.style.position = 'absolute';
//  div.style.backgroundColor = 'rgba(25,25,25,0.5)';
//  div.style.borderRadius = '5px'
//  // document.body.appendChild(div);

//  // 获得HTML元素创建的UI界面
// //  const tag = document.getElementById('tag');

//  // div元素包装为CSS3模型对象CSS3DObject，并插入场景中
//  const label = new CSS2DObject(div);
//  div.style.pointerEvents = 'none'; // 避免HTML标签遮挡三维场景的鼠标事件
//  // 设置HTML元素标签在three.js世界坐标中位置
//  label.position.set(113.4668, 33.8818, 4.9);
//  // 缩放CSS3DObject模型对象
//  label.scale.set(0.06, 0.06, 0.06);
//  label.rotateX(Math.PI / 2); // 从XOY平面旋转到XOZ平面
//  scene.add(label); // CSS3模型标签插入到场景中

//  // 创建一个CSS3渲染器CSS3DRenderer
//  const labelRenderer = new CSS2DRenderer();
//  labelRenderer.setSize(width, height);
//  labelRenderer.domElement.style.position = 'absolute';
//  // 避免renderer.domElement影响HTMl标签定位，设置top为0px
//  labelRenderer.domElement.style.top = '0px';
//  labelRenderer.domElement.style.left = '0px';
//  // 设置.pointerEvents=none，以免模型标签HTML元素遮挡鼠标选择场景模型
//  labelRenderer.domElement.style.pointerEvents = 'none';
// //  document.body.appendChild(labelRenderer.domElement);


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
// 设置背景颜色
renderer.setClearColor('#1E2A34', 0.8); // 设置背景颜色(颜色，透明度)
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

// 标注出来省份的行政中心
const pos = [113.4668, 33.8818]; // 省份行政中心位置经纬度
const size = 2.0; // 大小根据地图尺寸范围设置或者说相机渲染范围
// 河南郑州市经纬度
const mesh = cityPointMesh(size, pos[0], pos[1]);
mesh.position.z = mapHeight + 2.0; // 棱锥高度二分之一位置
scene.add(mesh);

const 棱锥 = ConeMesh(1.0, pos[0], pos[1]);
棱锥.position.z = mapHeight;
scene.add(棱锥);

// 光圈大小在原大小基础上1~2.5倍在之间变化,也就是mesh.size范围2~5之间
let _s = 2.0;

// // 是否旋转
// gui.add(obj, 'bool').name('旋转动画')
// 渲染函数
function render() {
  棱锥.rotateZ(0.01);
  _s += 0.02;
  mesh.scale.set(_s, _s, _s);
  if (_s <= 2.6) {
    mesh.material.opacity = (_s - 2.0) * 1.67;// 1.67约等于1/(2.6-2.0)，保证透明度在0~1之间变化
  } else if (_s > 2.6 && _s <= 5) {
    mesh.material.opacity = 1 - (_s - 2) / 3;// 缩放5.0对应0 缩放2.0对应1
  } else {
    _s = 2.0;
  }
  // 每次绕y轴旋转0.01弧度
  // if (obj.bool) mesh.rotateY(0.01);
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
let chooseMesh = null; // 标记鼠标拾取到的mesh
function choose(event) {
  if(chooseMesh) {
    chooseMesh.material.color.set(0x004444); // 恢复原来颜色
  }

  // 根据id获取模块
  const mapDox = document.getElementById('map3d1')
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
    intersects[0].object.material.color.set(0x009999);
    chooseMesh = intersects[0].object;
  }
}

addEventListener('click', choose); // 监听窗口鼠标单击事件
// addEventListener('mousemove', choose); // 监听窗口鼠标划过事件

export {renderer, labelRenderer};