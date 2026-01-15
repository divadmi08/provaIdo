<script>
  export let src;
  export let alt = "QR Code";
  export let size = "300px";
</script>

<div class="qr-container" style="width: {size}; height: {size};">
  <img {src} {alt} class="w-full h-full object-contain" />
</div>