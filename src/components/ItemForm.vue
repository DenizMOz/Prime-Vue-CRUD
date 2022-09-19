<template>

    <InputText id="first-name" v-model="formItems.first_name" />

    <InputText id="last-name" v-model="formItems.last_name" />

    <InputText id="email" type="email" v-model="formItems.email" />

    <InputText id="gender" v-model="formItems.gender" />

    <InputText id="ip-addr" v-model="formItems.ip_address" />

</template>

<script setup>
//imports
import { defineProps, defineExpose, onMounted, ref } from 'vue';
import { createItem, updateItem } from '../views/services/fetchservice.js';
//vars
const formItems = ref({});
const props = defineProps({
    forminp: {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        ip_address: '',
        id: ''
    }
});
//functions
function clearForm() {
    formItems.value.first_name = '';
    formItems.value.last_name = '';
    formItems.value.email = '';
    formItems.value.gender = '';
    formItems.value.ip_address = '';
    formItems.value.id = '';
}

async function handleEditEvent() {
    //TODO: Vuelidate validation
    console.log(formItems.value);
    await updateItem(formItems.value);
    clearForm();
}
async function handleAddEvent() {
    //TODO: Vuelidate validation
    await createItem(formItems.value);
    clearForm();
}

defineExpose({
    handleAddEvent,
    handleEditEvent
})
onMounted(() => {
    formItems.value = props.forminp;
})
</script>