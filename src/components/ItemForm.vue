<template>
    <div>
        <InputText id="first-name" v-model="formItems.first_name" @blur="v$.first_name.$touch" />
        <div class="input-errors" v-for="error of v$.first_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <div>
        <InputText id="last-name" v-model="formItems.last_name" @blur="v$.last_name.$touch" />
        <div class="input-errors" v-for="error of v$.last_name.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <div>
        <InputText id="email" type="email" v-model="formItems.email" @blur="v$.email.$touch" />
        <div class="input-errors" v-for="error of v$.email.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <div>
        <InputText id="gender" v-model="formItems.gender" @blur="v$.gender.$touch" />
        <div class="input-errors" v-for="error of v$.gender.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>

    <div>
        <InputText id="ip-addr" v-model="formItems.ip_address" @blur="v$.ip_address.$touch" />
        <div class="input-errors" v-for="error of v$.ip_address.$errors" :key="error.$uid">
            <div class="error-msg">{{ error.$message }}</div>
        </div>
    </div>
</template>

<script setup>
//imports
import { defineProps, defineExpose, onMounted, reactive } from 'vue';
import { createItem, updateItem } from '../views/services/fetchservice.js';
import { useVuelidate } from '@vuelidate/core'
import { required, email, ipAddress } from '@vuelidate/validators'
//vars
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

const formItems = reactive({
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    ip_address: ''

})

const rules = {
    first_name: { required },
    last_name: { required },
    email: { email, required },
    gender: { required },
    ip_address: { ipAddress, required }
}
const v$ = useVuelidate(rules, formItems)


//functions
function clearForm() {
    formItems.first_name = '';
    formItems.last_name = '';
    formItems.email = '';
    formItems.gender = '';
    formItems.ip_address = '';
    formItems.id = '';
}

async function handleEditEvent() {
    //TODO: Vuelidate validation
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) { return false; }
    await updateItem(formItems);
    clearForm();
    return true;
}
async function handleAddEvent() {
    //TODO: Vuelidate validation
    const isFormCorrect = await v$.value.$validate();
    if (!isFormCorrect) { return }
    await createItem(formItems);
    clearForm();
}

defineExpose({
    handleAddEvent,
    handleEditEvent
})
onMounted(() => {
    formItems.first_name = props.forminp.first_name;
    formItems.last_name = props.forminp.last_name;
    formItems.email = props.forminp.email;
    formItems.gender = props.forminp.gender;
    formItems.ip_address = props.forminp.ip_address;
    formItems.id = props.forminp.id;
})
</script>