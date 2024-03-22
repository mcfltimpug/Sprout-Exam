<template>
    <div class="alert alert-success fw-bold fst-italic" role="alert">
        <i class="fas fa-check-circle"></i>
        Employee {{ action }} Successfully
    </div>
</template>

<script setup>
const props = defineProps({
    action: String,
})
</script>