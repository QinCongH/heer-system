<template>
  <div class="FrontHead" :style="{ backgroundColor: fhValue.backGroundColor }">
    <div>
      <h1>{{ fhValue.data }}</h1>
      <p>{{ fhValue.title }}</p>
    </div>
    <div>
      <span>
        <i class="fa" :class="fhValue.fontIco" aria-hidden="true"></i>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "FroneHead",
  props: ["fhValue"],
};
</script>

<style lang="less" scoped>
.FrontHead {
  width: 100%;
  height: 100px;
  margin-top: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 4px 3px 9px 0px #eae7e7;
  transition: 0.3s cubic-bezier(0, 0, 0.73, 0.77);
  position: relative;
  &:hover {
    transform: rotateX(-180deg);
    cursor: pointer;
  }
  div {
    &:nth-child(1) {
      width: 60%;
      line-height: 30px;
      h1 {
        font-size: 30px;
        font-weight: bold;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      p {
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    &:nth-child(2) {
      i {
        font-size: 35px;
        color: #009c7f;
      }
    }
  }
}
</style>