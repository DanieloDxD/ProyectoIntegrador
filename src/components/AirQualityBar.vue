<template>
    <div class="air-quality-bar">
      <div class="bar" :style="{ width: `${percentage}%` }"></div>
      <div class="label">{{ label }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      percentage: {
        type: Number,
        required: true
      },
      label: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style>
  .air-quality-bar {
    position: relative;
    height: 20px;
    background-color: #e0e0e0;
    border-radius: 10px;
    margin-top: 10px;
  }
  
  .bar {
    height: 100%;
    border-radius: 10px;
    transition: width 0.5s;
  }
  
  .label {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #fff;
  }
  </style>
  