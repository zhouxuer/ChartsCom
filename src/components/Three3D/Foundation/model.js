
import * as THREE from 'three';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// 实例化一个加载器对象
const loader = new GLTFLoader();

// 创建一个组对象
const mesh = new THREE.Group()

loader.load('/static/工厂.gltf', (gltf) => {
    // console.log('gltf===', gltf);
    // 将模型添加到组对象中
    mesh.add(gltf.scene)
})

export default mesh;