// 引入three.js
import * as THREE from 'three';
// pointsArrs：一个行政区包含一个或多个轮廓，一个轮廓对应pointsArrs的一个元素
function ExtrudeMesh(pointsArrs, height) {
  const shapeArr = []; // 轮廓形状Shape集合
  pointsArrs.forEach(pointsArr => {
    const vector2Arr = [];
    // 转化为Vector2构成的顶点数组
    pointsArr[0].forEach(elem => {
      vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
    });
    const shape = new THREE.Shape(vector2Arr);
    shapeArr.push(shape);
  });
  // MeshBasicMaterial:不受光照影响
  // MeshLambertMaterial：几何体表面和光线角度不同，明暗不同
  const material = new THREE.MeshLambertMaterial({
    color: 0x004444
    // transparent: true,
    // opacity: 0.8,
  }); // 材质对象
  const geometry = new THREE.ExtrudeBufferGeometry( // 拉伸造型
    shapeArr, // 多个多边形二维轮廓
    // 拉伸参数
    {
      // depth：根据行政区尺寸范围设置，比如高度设置为尺寸范围的2%，过小感觉不到高度，过大太高了
      depth: height, // 拉伸高度
      bevelEnabled: false // 无倒角
    }
  );
  const mesh = new THREE.Mesh(geometry, material); // 网格模型对象
  return mesh;
}


export { ExtrudeMesh };