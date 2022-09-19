<template>
  <div>
    <Button title="Add an Item" icon="pi pi-plus-circle" class="p-button-rounded p-button-secondary"
      style="margin-right:10px" @click="toggleAddDialog()"></Button>
    <Button title="Clear All Items" icon="pi pi-trash" class="p-button-rounded p-button-danger"
      @click="toggleDelDialog()"></Button>
  </div>

  <div>
    <Dialog header="Add an Item" v-model:visible="addDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
      :style="{width: '50vw'}" :modal="true">

      <ItemForm ref="addItemFormRef" :forminp="addItemInput">
        <template></template>
      </ItemForm>

      <template #footer>
        <Button label="     " icon="pi pi-ban" @click="toggleAddDialog()" class="p-button-text"
          style="margin-right:10px"></Button>
        <Button label="     " icon="pi pi-check" @click="addItemBtn()" autofocus></Button>
      </template>

    </Dialog>
  </div>
  <Dialog header="Edit Item" v-model:visible="editDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
    :style="{width: '50vw'}" :modal="true">

    <ItemForm ref="editItemFormRef" :forminp="editItemInput">
      <template></template>
    </ItemForm>

    <template #footer>
      <Button label="Cancel" icon="pi pi-ban" @click="hideEditDialog()" class="p-button-text"
        style="margin-right:10px"></Button>
      <Button label="Edit" icon="pi pi-check" @click="editItemBtn()" autofocus></Button>
    </template>
  </Dialog>
  <div>
    <Dialog header="Delete All Items" v-model:visible="delDialog" :breakpoints="{'960px': '75vw', '640px': '90vw'}"
      :style="{width: '50vw'}" :modal="true">
      <div>
        Are you sure you want to delete all of this fake data?
        I mean it took a website 2 entire seconds to generate.
      </div>
      <template #footer>
        <Button label="Nevermind" icon="pi pi-ban" @click="toggleDelDialog()" class="p-button-text"
          style="margin-right:10px"></Button>
        <Button label="Do it!" icon="pi pi-check" @click="nukeTheData" autofocus></Button>
      </template>
    </Dialog>
  </div>
  <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="deleteSelected()"
    title="Delete Selection"></Button>
  <div>
    <DataTable :value="items" :paginator="true" :rows="12" dataKey="id" v-model:selection="selectedItems" removableSort
      v-model:filters="filters" filterDisplay="row" :globalFilterFields="getColumnFields()">
      <template #header>
        <div class="flex justify-content-end">
          <span class="p-input-icon-left ">
            <i class="pi pi-search" />
            <InputText v-model="filters['global'].value" placeholder="Search" />
          </span>
        </div>
      </template>
      <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
      <Column v-for="col of columns" :field="col.field" filterField="col.field" :header="col.header" :key="col.field"
        :sortable="true">
      </Column>
      <Column field="editor" header="Edit">
        <template #body="slotProps">
          <Button icon="pi pi-pencil" class="p-button-rounded p-button-secondary"
            @click="showEditDialog(slotProps.data)"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
//imports
import { getAllItems, deleteItem } from './services/fetchservice.js';
import { ref, onMounted, reactive } from 'vue';
import ItemForm from '../components/ItemForm.vue';
import { FilterMatchMode } from 'primevue/api';
// columns
const columns = ref([
  { field: 'first_name', header: 'First-Name' },
  { field: 'last_name', header: 'Last-Name' },
  { field: 'email', header: 'Email' },
  { field: 'gender', header: 'Gender' },
  { field: 'ip_address', header: 'IP-Addr.' }
]);
//vars
const addItemFormRef = ref(null);
const editItemFormRef = ref(null);
const selectedItems = ref();
const items = ref([]);
const editItemInput = reactive({
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  ip_address: ''
});
const addItemInput = reactive({
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  ip_address: ''
});
const editDialog = ref(false);
const addDialog = ref(false);
const delDialog = ref(false);
//filter stuff
const filters = ref({
  'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'first_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'last_name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  'email': { value: null, matchMode: FilterMatchMode.CONTAINS },
  'gender': { value: null, matchMode: FilterMatchMode.EQUALS },
  'ip_address': { value: null, matchMode: FilterMatchMode.CONTAINS }
});
//helper and button functions
function getColumnFields() {
  let colfields = [];
  for (const element of columns.value) {
    colfields.push(element.field);
  }
  return colfields;
}
function updateTableContent() {
  getAllItems().then(data => (items.value = data));
}

function toggleAddDialog() {
  addDialog.value = !addDialog.value;
}
function toggleDelDialog() {
  delDialog.value = !delDialog.value;
}

function showEditDialog(data) {
  editItemInput.id = data.id;
  editItemInput.first_name = data.first_name;
  editItemInput.last_name = data.last_name;
  editItemInput.email = data.email;
  editItemInput.gender = data.gender;
  editItemInput.ip_address = data.ip_address;
  //
  editDialog.value = !editDialog.value;
}
function hideEditDialog() {
  editDialog.value = !editDialog.value;
}

async function deleteSelected() {
  for (let i = 0; i < selectedItems.value.length; i++) {
    await deleteItem(selectedItems.value[i]);
  }
  updateTableContent();
}
async function nukeTheData() {
  for (let i = 0; i < items.value.length; i++) {
    await deleteItem(items.value[i]);
  }
  updateTableContent();
  toggleDelDialog();
}
async function editItemBtn() {
  await editItemFormRef.value.handleEditEvent();
  hideEditDialog();
  await updateTableContent();
}
async function addItemBtn() {
  await addItemFormRef.value.handleAddEvent();
  toggleAddDialog();
  await updateTableContent();
}
onMounted(() => {
  getAllItems().then(data => (items.value = data));
})

</script>

