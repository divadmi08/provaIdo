<script lang="ts">
  export let src: string;
  export let alt: string = "QR Code";
  export let size: string = "300px";
</script>

<div class="qr-container" style="width: {size}; height: {size};">
  <img {src} {alt} class="w-full h-full object-contain" />
</div>