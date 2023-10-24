// 引入three.js
import * as THREE from 'three';
// pointsArrs：一个行政区包含一个或多个轮廓，一个轮廓对应pointsArrs的一个元素
function shapeMesh(pointsArrs) {
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
  const material = new THREE.MeshBasicMaterial({
      color: 0x004444,
      side: THREE.DoubleSide // 两面可见
  }); // 材质对象
  const geometry = new THREE.ShapeBufferGeometry(shapeArr);
  const mesh = new THREE.Mesh(geometry, material); // 网格模型对象
  return mesh;
}
export { shapeMesh };