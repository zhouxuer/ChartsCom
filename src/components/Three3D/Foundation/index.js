// 引入Three.js
import * as THREE from 'three';
// 引入Three.js扩展库，相机控件OrbitControls
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// 引入dat.gui.js的一个类GUI
import { GUI } from 'three/examples/jsm/libs/dat.gui.module'
// 模型对象
import mesh from './model';

/**
 * 实例化一个gui对象
 */
const gui = new GUI();
// 改变交互界面style属性
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';


/**
 * 创建场景对象Scene
 */
const scene = new THREE.Scene();


// /**
//  * 创建网格模型
//  */
// // 几何体，立方体
// const geometry = new THREE.BoxGeometry(100, 100, 100);
// // 材质，漫反射
// const material = new THREE.MeshPhongMaterial({
//   color: '#0ff',
//   shininess: 30, // 高光部分的亮度，默认30
//   specular: '#ff1' // 高光部分的颜色
// });
// // 模型，网格模型
// const mesh = new THREE.Mesh(geometry, material);
// // 添加模型到场景
// scene.add(mesh);

// 模型对象添加到场景中
scene.add(mesh);


/**
 * 创建GUI界面
 */
// 添加分组
const positions = gui.addFolder('位置');
// 默认关闭
positions.close()
// 通过GUI改变mesh.position对象的xyz属性
positions.add(mesh.position, 'x', 0, 100).name('x轴').step(5)
positions.add(mesh.position, 'y', 0, 100).name('y轴').step(5)
positions.add(mesh.position, 'z', 0, 100).name('z轴').step(5)
// .addColor()生成颜色值改变的交互界面
const obj = {
  color: '#0ff',
  specular: '#ff1',
  bool: false
}
const materials = gui.addFolder('材质')
// 默认关闭
materials.close()
// .addColor()生成颜色值改变的交互界面
materials.addColor(obj, 'color').onChange(function(value) {
  mesh.material.color.set(value);
});
materials.addColor(obj, 'specular').onChange(function(value) {
  mesh.material.specular.set(value);
});


/**
 * 光源设置
 */
// 点光源
const point = new THREE.PointLight('#fff', 2);
// 光源位置
point.position.set(40, 250, 300);
// 添加光源到场景
scene.add(point);
// 通过GUI改变pointLight对象的光源强度属性
const parallelLight = gui.addFolder('点光源')
// 默认关闭
parallelLight.close()
// 通过GUI改变directionalLight对象的光源强度属性
parallelLight.add(point, 'intensity', 0, 2).name('点光源强度')
// 位置
const parallelLightPosition = parallelLight.addFolder('点光源位置')
// 默认关闭
parallelLightPosition.close()
parallelLightPosition.add(point.position, 'x', -400, 400)
parallelLightPosition.add(point.position, 'y', -400, 400)
parallelLightPosition.add(point.position, 'z', -400, 400)

// 环境光
const ambient = new THREE.AmbientLight('#fff', 1);
// 添加环境光到场景
scene.add(ambient);
// 通过GUI改变ambient对象的光源强度属性
const ambientLight = gui.addFolder('环境光')
// 默认关闭
ambientLight.close()
// 通过GUI改变ambient对象的光源强度属性
ambientLight.add(ambient, 'intensity', 0, 1).name('环境光强度')


/**
 * 创建一个三维坐标轴
 */
const axesHelper = new THREE.AxesHelper(100)
// 把坐标轴对象添加到三维场景中
scene.add(axesHelper)


/**
 * 相机设置
 */
// 定义canvas画布大小
const width = 1200; // canvas画布宽度
const height = 800; // canvas画布高度
const k = width / height; // canvas画布宽高比
// const s = 80; // 三维场景显示范围控制系数，系数越大，显示的范围越大
// 创建相机对象
// const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
const camera = new THREE.PerspectiveCamera(30, k, 1, 1000);
// 设置相机位置
camera.position.set(-200, 180, 160);
// 设置相机方向(指向的场景对象)
camera.lookAt(scene.position);
// 通过GUI改变ambient对象的光源强度属性
const cameraPos = gui.addFolder('相机位置')
// 默认关闭
cameraPos.close()
// 通过GUI改变ambient对象的光源强度属性
cameraPos.add(camera.position, 'x', -400, 400).name('x轴')
cameraPos.add(camera.position, 'y', -400, 400).name('y轴')
cameraPos.add(camera.position, 'z', -400, 400).name('z轴')


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

// 是否旋转
gui.add(obj, 'bool').name('旋转动画')
// 渲染函数
function render() {
  // 每次绕y轴旋转0.01弧度
  if (obj.bool) mesh.rotateY(0.01);
  // 内容更改重新渲染画布内容，执行渲染操作
  renderer.render(scene, camera) // 周期性执行相机的渲染功能，更新canvas画布上的内容
  // 请求再次执行渲染函数render，渲染下一帧
  requestAnimationFrame(render);
}
// 动画函数
render();

// 创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
new OrbitControls(camera, renderer.domElement);

export {renderer};