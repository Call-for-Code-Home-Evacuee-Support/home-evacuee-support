<template>
  <div id="user-map">
    <l-map ref="map" style="height: 600px;" :zoom="zoom" 
      :center="[$route.query.y, $route.query.x]">
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="[$route.query.y, $route.query.x]"></l-marker>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "user-map",
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 16,
    };
  }
};
</script>

<style>
#user-map{
  height:100%;
  margin:0px;
  z-index:0;
}
</style>
