<template>
  <div class="home">
    <VictimForm/>
  </div>
</template>

<script>
// @ is an alias to /src
import VictimForm from '@/components/VictimForm.vue'

export default {
  name: 'Home',
  components: {
    VictimForm
  }
}
</script>
