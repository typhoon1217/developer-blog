<div class="fixed inset-0 flex items-center justify-center">
  <div class="w-8 h-8 border-4 border-t-transparent border-current rounded-full animate-spin"></div>
</div>

<style>
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .animate-spin {
    animation: spin 1s linear infinite;
  }
</style>