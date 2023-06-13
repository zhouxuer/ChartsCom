<template >
  <div id="map1" style="width: 800px; height: 800px"></div>
</template>
<script>
import 'ol/ol.css';
import { Map, View } from 'ol';
// import Tile from 'ol/layer/Tile';
// import { Static } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import TileLayer from 'ol/layer/Tile';
// import XYZ from 'ol/source/XYZ';
// import { fromLonLat } from 'ol/proj';
import iconImg from '../../assets/标点.png'; // 图片 可自定义
import {ImageStatic as Static} from 'ol/source';
export default {
  data() {
    return {
      map: null
    };
  },
  methods: {
    // 点位显示
    showPoints() {
      const mapData = [
        {
          domain_id: 10000029,
          domain_name: '北京市第一看守所',
          domain_type_name: '看守所',
          gps_x: '116.40384397',
          gps_y: '39.91487908',
          count: 0,
          channel_id: '',
          group_idx: 1
        },
        {
          domain_id: 10000028,
          domain_name: '北京市第一看守所',
          domain_type_name: '看守所',
          gps_x: '116.47324397',
          gps_y: '39.91927908',
          count: 0,
          channel_id: '',
          group_idx: 1
        },
        {
          domain_id: 10000027,
          domain_name: '北京市第一看守所',
          domain_type_name: '看守所',
          gps_x: '116.43324397',
          gps_y: '39.93483908',
          count: 0,
          channel_id: '',
          group_idx: 1
        },
        {
          domain_id: 10000026,
          domain_name: '北京市第一看守所',
          domain_type_name: '看守所',
          gps_x: '116.50382397',
          gps_y: '39.99487708',
          count: 0,
          channel_id: '',
          group_idx: 1
        }
      ];
      const vectorLayer = new VectorLayer({
        source: new VectorSource(),
        style: new Style({
          image: new Icon({
            src: iconImg,
            anchor: [0.75, 0.5],
            scale: 0.2,
            rotateWithView: false
            // rotation: -rotation + Math.PI
          })
        })
      });

      const features = [];
      mapData.forEach((item) => {
        if (item.gps_x && item.gps_y) {
          const newObj = Object.assign({}, item);
          newObj.geometry = new Point([Number(item.gps_x), Number(item.gps_y)]);
          features.push(new Feature(newObj));
        }
      });
      vectorLayer.getSource().addFeatures(features);
      this.map.addLayer(vectorLayer);
    },

    // 初始化默认地图
    createMap() {
      this.map = new Map({
        target: 'map1',
        layers: [
          new TileLayer({
            source: new Static({
              url: '../../assets/map01.png'
              // imageExtent: [-6500, -1860, 117650, 49620]
            })
          })
        ],
        view: new View({
          center: [116.40387397, 39.91488908],
          // center: fromLonLat([116.403414, 39.924091]),
          zoom: 12
          // maxZoom: 20,
          // projection: 'EPSG:3857'
        })
      });
      this.showPoints();
    }
  },
  mounted() {
    // setTimeout(() => {
    //   this.createMap()
    // }, 100);
    this.createMap();
  }
};
</script>

<style scoped>
.box {
  width: 100% !important;
  height: 100% !important;
  position: relative !important;
}
#container {
  width: 100% !important;
  height: 100% !important;
}
.ol-control {
  display: none !important;
}
</style>
