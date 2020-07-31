<template>
  <b-container class="deliveries">
    <DeliveriesTable/>
  </b-container>
</template>

<script>
import DeliveriesTable from "@/components/DeliveriesTable"

export default {
  components: {
    DeliveriesTable,
  }
}
</script>