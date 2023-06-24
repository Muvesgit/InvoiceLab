<template>
<div>
	<MessageWindow v-if="messageBoardContent" :message="messageBoardContent"/>

	<div v-if="loggedUser">
		<div class="profileTopSection">
			<div class="profileCard">
				<div class="defaultAvatar">
					<i class="pi pi-user"></i>
				</div>
				<div class="profileCardInfo">
					<div class="profileCardTop">
						<h2>My Profile</h2>
						<h1>{{ loggedUser.firstName + " " + loggedUser.lastName }}</h1>
					</div>

					<div class="profileCardBottom">
						<div class="dataPoint">
							<div></div> <h3>First Name: </h3><p>{{ loggedUser.firstName  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>Last Name: </h3><p>{{ loggedUser.lastName  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>E-mail address: </h3><p>{{ loggedUser.email  }}</p>
						</div>
						<div class="smallPrimaryButton" @click="() => {editOn = 1}">
							<h1>Edit</h1>
						</div>
					</div>
				</div>
			</div>

			<div class="companyCard">
				<div class="defaultAvatar">
					<i class="pi pi-file"></i>
				</div>
				<div class="profileCardInfo">
					<div class="profileCardTop">
						<h2>My Company</h2>
						<h1>{{ loggedUser.company.name }}</h1>
					</div>

					<div class="profileCardBottom">
						<div class="dataPoint">
							<div></div> <h3>Company Registration Number: </h3><p>{{ loggedUser.company.orgReg  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>Customer Identification File: </h3><p>{{ loggedUser.company.cif  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>Address: </h3><p>{{ loggedUser.company.address  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>Bank: </h3><p>{{ loggedUser.company.bank  }}</p>
						</div>
						<div class="dataPoint">
							<div></div> <h3>Account - IBAN: </h3><p>{{ loggedUser.company.account  }}</p>
						</div>
						<div class="smallPrimaryButton" @click="() => {editOn = 2}">
							<h1>Edit</h1>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="profileBottomSection">
			<div class="headerSection">
				<div class="smallPrimaryButton" @click="() => {bottomSectionController = 0}" v-bind:class="{focusedPrimaryButton : bottomSectionController == 0}">
					<h1>Clients</h1>
				</div>
				<div class="smallPrimaryButton" @click="() => {bottomSectionController = 1}" v-bind:class="{focusedPrimaryButton : bottomSectionController == 1}">
					<h1>Products</h1>
				</div>
				<div class="smallPrimaryButton" @click="() => {bottomSectionController = 2}" v-bind:class="{focusedPrimaryButton : bottomSectionController == 2}">
					<h1>Statistics</h1>
				</div>
				<div class="smallPrimaryButton" @click="() => {bottomSectionController = 3}" v-bind:class="{focusedPrimaryButton : bottomSectionController == 3}">
					<h1>Archives</h1>
				</div>
			</div>

			<div class="arrowWrapper">
				<i class="pi pi-arrow-circle-left" @click="() => {(bottomSectionController > 0) ? bottomSectionController-- : bottomSectionController}"></i>

				<div v-if="bottomSectionController == 0" class="contentSection">
					<div class="head">
						<h1>Clients</h1>
						<div class="smallPrimaryButton" @click="() => {this.editOn = 3}">
							<h1>Add new</h1>
						</div>
					</div>
					<DataTable v-if="updatedUser.clients.length > 0" class="ops" :value="updatedUser.clients" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters" dataKey="id" filterDisplay="row" :globalFilterFields="['name', 'orgReg', 'cif', 'address', 'bank', 'account']">
						<template #header>
							<div class="flex justify-content-end">
								<i class="pi pi-search" />
								<input v-model="filters['global'].value" placeholder="Keyword Search" />
							</div>
						</template>
						<Column field="name" header="Name"></Column>
						<Column field="orgReg" header="Company Registration Number"></Column>
						<Column field="cif" header="Customer Identification File"></Column>
						<Column field="address" header="Address"></Column>
						<Column field="bank" header="Bank"></Column>
						<Column field="account" header="Account"></Column>
						<Column header="Modify">
							<template #body="slotprops">
								<i class="pi pi-user-edit" @click="() => {editableEntity = slotprops.data; editOn = 5}"></i>
								<i class="pi pi-trash" @click="() => {editableEntity = slotprops.data; editOn = 7}"></i>
							</template>
						</Column>
					</DataTable>
					<div class="head" v-else>
						<h2>You have no clients stored</h2>
					</div>
				</div>

				<div v-if="bottomSectionController == 1" class="contentSection">
					<div class="head">
						<h1>Products</h1>
						<div class="smallPrimaryButton" @click="() => {this.editOn = 4}">
							<h1>Add new</h1>
						</div>
					</div>
					<DataTable v-if="updatedUser.products.length > 0" class="ops" :value="updatedUser.products" paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters" dataKey="id" filterDisplay="row" :globalFilterFields="['name', 'price']">
						<template #header>
							<div class="flex justify-content-end">
								<i class="pi pi-search" />
								<input v-model="filters['global'].value" placeholder="Keyword Search" />
							</div>
						</template>
						<Column field="name" header="Name"></Column>
						<Column field="price" header="Price"></Column>
						<Column header="Modify">
							<template #body="slotprops">
								<i class="pi pi-user-edit" @click="() => {editableEntity = slotprops.data; editOn = 6}"></i>
								<i class="pi pi-trash" @click="() => {editableEntity = slotprops.data; editOn = 8}"></i>
							</template>
						</Column>
					</DataTable>
					<div class="head" v-else>
						<h2>You have no products stored</h2>
					</div>
				</div>

				<div v-if="bottomSectionController == 2" class="contentSection">
					<div>
						<h1>Statistics</h1>
						<h2>Coming soon</h2>
					</div>
				</div>

				<div v-if="bottomSectionController == 3" class="contentSection">
					<div>
						<h1>Archives</h1>
						<h2>Coming soon</h2>
					</div>
				</div>

				<i class="pi pi-arrow-circle-right" @click="() => {(bottomSectionController < 3) ? bottomSectionController++ : bottomSectionController}"></i>
			</div>
		</div>
		
		<div v-if="editOn > 0" class="editingOverlay" @click="() => {editOn = 0}"></div>
		<div v-if="editOn == 1" class="editData">
			<div class="header"> <h1>Edit My Profile</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div class="info">
				<h2>First Name</h2>
				<input v-model="updatedUser.firstName">
				<h2>Last Name</h2>
				<input v-model="updatedUser.lastName">
				<h2>Email</h2>
				<input v-model="updatedUser.email">

				<div class="smallPrimaryButton" @click="updatePersonal()">
					<h1>Save</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 2" class="editData">
			<div class="header"> <h1>Edit My Company</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div class="info">
				<h2>Company Name:</h2>
				<input v-model="updatedUser.company.name">
				<h2>Company Registration Number:</h2>
				<input v-model="updatedUser.company.orgReg">
				<h2>Customer Identification File:</h2>
				<input v-model="updatedUser.company.cif">
				<h2>Address:</h2>
				<input v-model="updatedUser.company.address">
				<h2>Bank:</h2>
				<input v-model="updatedUser.company.bank">
				<h2>Account - IBAN:</h2>
				<input v-model="updatedUser.company.account">

				<div class="smallPrimaryButton" @click="updateCompany()">
					<h1>Save</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 3" class="editData">
			<div class="header"> <h1>Add New Client</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div class="info">
				<h2>Company Name:</h2>
				<input v-model="newClient.name">
				<h2>Company Registration Number:</h2>
				<input v-model="newClient.orgReg">
				<h2>Customer Identification File:</h2>
				<input v-model="newClient.cif">
				<h2>Address:</h2>
				<input v-model="newClient.address">
				<h2>Bank:</h2>
				<input v-model="newClient.bank">
				<h2>Account - IBAN:</h2>
				<input v-model="newClient.account">

				<div class="smallPrimaryButton" @click="addNewClient()">
					<h1>Add</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 4" class="editData">
			<div class="header"> <h1>Add New Product</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div class="info">
				<h2>Product Name:</h2>
				<input v-model="newProduct.name">
				<h2>Product Price:</h2>
				<input v-model="newProduct.price">

				<div class="smallPrimaryButton" @click="addNewProduct()">
					<h1>Add</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 5" class="editData">
			<div class="header"> <h1>Edit Client</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div v-if="editableEntity" class="info">
				<h2>Company Name:</h2>
				<input v-model="editableEntity.name">
				<h2>Company Registration Number:</h2>
				<input v-model="editableEntity.orgReg">
				<h2>Customer Identification File:</h2>
				<input v-model="editableEntity.cif">
				<h2>Address:</h2>
				<input v-model="editableEntity.address">
				<h2>Bank:</h2>
				<input v-model="editableEntity.bank">
				<h2>Account - IBAN:</h2>
				<input v-model="editableEntity.account">

				<div class="smallPrimaryButton" @click="updateClient()">
					<h1>Save</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 6" class="editData">
			<div class="header"> <h1>Edit Product</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div v-if="editableEntity" class="info">
				<h2>Product Name:</h2>
				<input v-model="editableEntity.name">
				<h2>Product Price:</h2>
				<input v-model="editableEntity.price">

				<div class="smallPrimaryButton" @click="updateProduct()">
					<h1>Save</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 7" class="confirmData">
			<div class="header"> <h1>Delete Client</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div v-if="editableEntity" class="info">
				<h2>Are you sure you would like to delete "{{ editableEntity.name }}"?</h2>
			</div>
			<div class="confirm">
				<div class="smallPrimaryButton" @click="deleteClient()">
					<h1>Delete</h1>
				</div>
				<div class="smallSecondaryButton" @click="() => {editOn = 0}">
					<h1>Cancel</h1>
				</div>
			</div>
		</div>
		<div v-if="editOn == 8" class="confirmData">
			<div class="header"> <h1>Delete Product</h1> <i class="pi pi-times" @click="() => {editOn = 0}"></i> </div>
			<div v-if="editableEntity" class="info">
				<h2>Are you sure you would like to delete "{{ editableEntity.name }}"?</h2>
			</div>
			<div class="confirm">
				<div class="smallPrimaryButton" @click="deleteProduct()">
					<h1>Delete</h1>
				</div>
				<div class="smallSecondaryButton" @click="() => {editOn = 0}">
					<h1>Cancel</h1>
				</div>
			</div>
		</div>
	</div>

	<UserAuth v-else />
</div>
</template>

<script>
import MessageWindow from '../support/MessageWindow.vue'
import UserAuth from '../auth/Auth.vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
// import ColumnGroup from 'primevue/columngroup';   // optional
// import Row from 'primevue/row';                   // optional


export default{
	name: "ProfilePage",
	components: {
		MessageWindow,
		UserAuth,
		DataTable,
		Column
	},
	setup(){
		var loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
		var updatedUser = JSON.parse(JSON.stringify(loggedUser));

		console.log(loggedUser);
		
		var newClientTemplate = {
			name: "",
			orgReg: "",
			cif: "",
			address: "",
			bank: "",
			account: "",
		};
		var newProductTemplate = {
			name: "",
			price: 0,
		};
		
		return{
			loggedUser,
			updatedUser,
			newClientTemplate,
			newProductTemplate
		}
	},
	data(){
		return{
			messageBoardContent: null,

			bottomSectionController: 0,
			editOn: 0,

			newClient: null,
			newProduct: null,

			editableEntity: null,
			filters: {
				global: {
					value: ''
				}
			},
		}
	},
	watch: {

	},
	mounted(){
		this.newClient = this.newClientTemplate;
		this.newProduct = this.newProductTemplate;
	},
	methods:{
		openMessageBoard(content){
      this.messageBoardContent = content;

      setTimeout(() => {
        this.messageBoardContent = null;
      }, 6200);
    },

		async updatePersonal(){
			let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if ( !this.updatedUser.email.match(validRegex) ) {
				this.openMessageBoard("Please enter a valid email address!");
				return;
			}
			if ( !this.updatedUser.firstName ){
				this.openMessageBoard("Please enter a valid first name!");
				return;
			}
			if ( !this.updatedUser.lastName ){
				this.openMessageBoard("Please enter a valid last name!");
				return;
			}

			let data = JSON.stringify({
				email: this.updatedUser.email,
				firstName: this.updatedUser.firstName,
				lastName: this.updatedUser.lastName,
			});

			try{
				await fetch(process.env.VUE_APP_PERSONAL_UPDATE + this.loggedUser._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Personal data updated successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(this.updatedUser));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async updateCompany(){
			if ( !this.updatedUser.company.name){
				this.openMessageBoard("Please enter a valid Company Name!");
				return;
			}
			if ( !this.updatedUser.company.orgReg){
				this.openMessageBoard("Please enter a valid Company Registration Number!");
				return;
			}
			if ( !this.updatedUser.company.cif ){
				this.openMessageBoard("Please enter a valid Customer Identification File!");
				return;
			}
			if ( !this.updatedUser.company.address ){
				this.openMessageBoard("Please enter a valid address!");
				return;
			}
			if ( !this.updatedUser.company.bank ){
				this.openMessageBoard("Please enter a valid bank!");
				return;
			}
			if ( !this.updatedUser.company.account ){
				this.openMessageBoard("Please enter a valid bank account number!");
				return;
			}

			let data = JSON.stringify({
				name: this.updatedUser.company.name,
				orgReg: this.updatedUser.company.orgReg,
				cif: this.updatedUser.company.cif,
				address: this.updatedUser.company.address,
				bank: this.updatedUser.company.bank,
				account: this.updatedUser.company.account,
			});

			try{
				await fetch(process.env.VUE_APP_COMPANY_UPDATE + this.loggedUser._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Company data updated successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(this.updatedUser));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async addNewClient(){
			if ( !this.newClient.name){
				this.openMessageBoard("Please enter a valid Company Name!");
				return;
			}
			if ( !this.newClient.orgReg){
				this.openMessageBoard("Please enter a valid Company Registration Number!");
				return;
			}
			if ( !this.newClient.cif ){
				this.openMessageBoard("Please enter a valid Customer Identification File!");
				return;
			}
			if ( !this.newClient.address ){
				this.openMessageBoard("Please enter a valid address!");
				return;
			}
			if ( !this.newClient.bank ){
				this.openMessageBoard("Please enter a valid bank!");
				return;
			}
			if ( !this.newClient.account ){
				this.openMessageBoard("Please enter a valid bank account number!");
				return;
			}

			let data = JSON.stringify({
				name: this.newClient.name,
				orgReg: this.newClient.orgReg,
				cif: this.newClient.cif,
				address: this.newClient.address,
				bank: this.newClient.bank,
				account: this.newClient.account,
			});

			try{
				await fetch(process.env.VUE_APP_ADD_CLIENT + this.loggedUser._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Company data updated successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async addNewProduct(){
			if ( !this.newProduct.name){
				this.openMessageBoard("Please enter a valid Product Name!");
				return;
			}
			if ( this.newProduct.price != Number(this.newProduct.price) ){
				this.openMessageBoard("Please enter a valid Product Price!");
				return;
			}

			let data = JSON.stringify({
				name: this.newProduct.name,
				price: this.newProduct.price,
			});

			try{
				await fetch(process.env.VUE_APP_ADD_PRODUCT + this.loggedUser._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Product added successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async updateClient(){
			if ( !this.editableEntity.name){
				this.openMessageBoard("Please enter a valid Company Name!");
				return;
			}
			if ( !this.editableEntity.orgReg){
				this.openMessageBoard("Please enter a valid Company Registration Number!");
				return;
			}
			if ( !this.editableEntity.cif ){
				this.openMessageBoard("Please enter a valid Customer Identification File!");
				return;
			}
			if ( !this.editableEntity.address ){
				this.openMessageBoard("Please enter a valid address!");
				return;
			}
			if ( !this.editableEntity.bank ){
				this.openMessageBoard("Please enter a valid bank!");
				return;
			}
			if ( !this.editableEntity.account ){
				this.openMessageBoard("Please enter a valid bank account number!");
				return;
			}

			let data = JSON.stringify({
				name: this.editableEntity.name,
				orgReg: this.editableEntity.orgReg,
				cif: this.editableEntity.cif,
				address: this.editableEntity.address,
				bank: this.editableEntity.bank,
				account: this.editableEntity.account,
			});

			try{
				await fetch(process.env.VUE_APP_CLIENT_UPDATE + this.loggedUser._id + '/clientUpdate/' + this.editableEntity._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Client data updated successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async updateProduct(){
			if ( !this.editableEntity.name){
				this.openMessageBoard("Please enter a valid Product Name!");
				return;
			}
			if ( this.editableEntity.price != Number(this.editableEntity.price) ){
				this.openMessageBoard("Please enter a valid Product Price!");
				return;
			}

			let data = JSON.stringify({
				name: this.editableEntity.name,
				price: this.editableEntity.price,
			});

			try{
				await fetch(process.env.VUE_APP_PRODUCT_UPDATE + this.loggedUser._id + '/productUpdate/' + this.editableEntity._id,
				{
					method: "PATCH",
					headers: {
						'Content-Type': 'application/json',
					},
					body: data
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Product data updated successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async deleteClient(){
			try{
				await fetch(process.env.VUE_APP_CLIENT_UPDATE + this.loggedUser._id + '/deleteClient/' + this.editableEntity._id,
				{
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Client deleted successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		},

		async deleteProduct(){
			try{
				await fetch(process.env.VUE_APP_PRODUCT_UPDATE + this.loggedUser._id + '/deleteProduct/' + this.editableEntity._id,
				{
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((response) => response.json())
				.then((res) => {
					if(res.status == 201){
						localStorage.removeItem("loggedUser");
						localStorage.setItem("loggedUser", JSON.stringify(res.user));
						this.openMessageBoard("Product deleted successfully!");
						this.loggedUser = JSON.parse(JSON.stringify(res.user));
						this.updatedUser = JSON.parse(JSON.stringify(res.user));

						this.editOn = 0;
					}
				})
			}
			catch(error){
				this.openMessageBoard(error.message);
			}
		}
	}
}
</script>