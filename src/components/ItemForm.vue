<template>

    <InputText id="first-name" v-model="formItems.first_name" />

    <InputText id="last-name" v-model="formItems.last_name" />

    <InputText id="email" type="email" v-model="formItems.email" />

    <InputText id="gender" v-model="formItems.gender" />

    <InputText id="ip-addr" v-model="formItems.ip_address" />

</template>

<script setup>
//imports
//import { reactive } from "vue";
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
    //check v$ states here?
    await createItem(formItems.value);
    clearForm();
}

defineExpose({
    handleAddEvent,
    handleEditEvent
})
//lifecycle hooks
onMounted(() => {
    formItems.value = props.forminp;
})



// Use vuelidate later
/* import { email, required, ipAddress } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core"; */

/* //vuelidate rules
const rules = {
    first_name: { required },
    last_name: { required },
    email: { required, email },
    gender: {},
    ip_address: { required, ipAddress }

}
const v$ = useVuelidate(forminp, rules); */
//
//Example vuelidate to use later:
//
// warning: Gave "too much recursion" error, check that out later
/* 
<div :class="{ error: v$.first_name.$errors.length }">
        <InputText id="first-name" type="text" v-model="forminp.first_name" :placeholder="forminp.first_name" />
        <div class="input-errors" v-for="error of v$.first_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
 */
</script>