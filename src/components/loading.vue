<template>
    <div>
        <div class="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
        </div>
        <div class="flex justify-center">
            <h1 class="text-3xl font-extrabold">CARGANDO
                <span class="animate-ping text-4xl">. . .</span>
            </h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {});
</script>

<style scoped>
    /* Archivo CSS para las animaciones personalizadas */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer utilities {
  .loadingspinner {
    --square: 26px;
    --offset: 30px;
    --duration: 2.4s;
    --delay: 0.2s;
    --timing-function: ease-in-out;
    --in-duration: 0.4s;
    --in-delay: 0.1s;
    --in-timing-function: ease-out;
    @apply mx-auto my-10 relative;
    width: calc(3 * var(--offset) + var(--square));
    height: calc(2 * var(--offset) + var(--square));
  }

  .loadingspinner div {
    @apply inline-block bg-orange-600 absolute rounded-sm text-xs text-black;
    width: var(--square);
    height: var(--square);
  }

  @keyframes square1 {
    0% {
      left: calc(0 * var(--offset));
      top: calc(0 * var(--offset));
    }

    8.333% {
      left: calc(0 * var(--offset));
      top: calc(1 * var(--offset));
    }

    100% {
      left: calc(0 * var(--offset));
      top: calc(1 * var(--offset));
    }
  }

  @keyframes square2 {
    0% {
      left: calc(0 * var(--offset));
      top: calc(1 * var(--offset));
    }

    8.333% {
      left: calc(0 * var(--offset));
      top: calc(2 * var(--offset));
    }

    16.67% {
      left: calc(1 * var(--offset));
      top: calc(2 * var(--offset));
    }

    25% {
      left: calc(1 * var(--offset));
      top: calc(1 * var(--offset));
    }

    83.33% {
      left: calc(1 * var(--offset));
      top: calc(1 * var(--offset));
    }

    91.67% {
      left: calc(1 * var(--offset));
      top: calc(0 * var(--offset));
    }

    100% {
      left: calc(0 * var(--offset));
      top: calc(0 * var(--offset));
    }
  }

  @keyframes square3 {
    0%, 100% {
      left: calc(1 * var(--offset));
      top: calc(1 * var(--offset));
    }

    16.67% {
      left: calc(1 * var(--offset));
      top: calc(1 * var(--offset));
    }

    25% {
      left: calc(1 * var(--offset));
      top: calc(0 * var(--offset));
    }

    33.33% {
      left: calc(2 * var(--offset));
      top: calc(0 * var(--offset));
    }

    41.67% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }

    66.67% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }

    75% {
      left: calc(2 * var(--offset));
      top: calc(2 * var(--offset));
    }

    83.33% {
      left: calc(1 * var(--offset));
      top: calc(2 * var(--offset));
    }

    91.67% {
      left: calc(1 * var(--offset));
      top: calc(1 * var(--offset));
    }
  }

  @keyframes square4 {
    0% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }

    33.33% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }

    41.67% {
      left: calc(2 * var(--offset));
      top: calc(2 * var(--offset));
    }

    50% {
      left: calc(3 * var(--offset));
      top: calc(2 * var(--offset));
    }

    58.33% {
      left: calc(3 * var(--offset));
      top: calc(1 * var(--offset));
    }

    100% {
      left: calc(3 * var(--offset));
      top: calc(1 * var(--offset));
    }
  }

  @keyframes square5 {
    0% {
      left: calc(3 * var(--offset));
      top: calc(1 * var(--offset));
    }

    50% {
      left: calc(3 * var(--offset));
      top: calc(1 * var(--offset));
    }

    58.33% {
      left: calc(3 * var(--offset));
      top: calc(0 * var(--offset));
    }

    66.67% {
      left: calc(2 * var(--offset));
      top: calc(0 * var(--offset));
    }

    75% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }

    100% {
      left: calc(2 * var(--offset));
      top: calc(1 * var(--offset));
    }
  }

  @keyframes squarefadein {
    0% {
      transform: scale(0.75);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  #square1 {
    animation: square1 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
    left: calc(0 * var(--offset));
    top: calc(0 * var(--offset));
  }

  #square2 {
    animation: square2 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(1 * var(--in-delay)) var(--in-timing-function) both;
    left: calc(0 * var(--offset));
    top: calc(1 * var(--offset));
  }

  #square3 {
    animation: square3 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(2 * var(--in-delay)) var(--in-timing-function) both;
    left: calc(1 * var(--offset));
    top: calc(1 * var(--offset));
  }

  #square4 {
    animation: square4 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(3 * var(--in-delay)) var(--in-timing-function) both;
    left: calc(2 * var(--offset));
    top: calc(1 * var(--offset));
  }

  #square5 {
    animation: square5 var(--duration) var(--delay) var(--timing-function) infinite,
               squarefadein var(--in-duration) calc(4 * var(--in-delay)) var(--in-timing-function) both;
    left: calc(3 * var(--offset));
    top: calc(1 * var(--offset));
  }
}

</style>