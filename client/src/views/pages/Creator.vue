<template>
<div @click="clickListener($event)">
	<MessageWindow v-if="messageBoardContent" :message="messageBoardContent"/>

	<div class="creatorTab">
		<div class="optionSection">
			<h1>Create your invoice</h1>
			<Accordion :multiple="true" :activeIndex="[0]">
				<AccordionTab header="Invoice Information">
					<div class="accordionSection">
						<div class="row">

							<div class="column">
								<h1>Document Type</h1>

								<div class="dropdownWrap" @click="() => {(dropdownVisibility[0]) ? dropdownVisibility[0]++ : dropdownVisibility[0]--}">
									<div class="dropdownHeader">
										<h1 v-if="selectedType"> {{ selectedType.name }} </h1>
										<h2 v-else>Choose Invoice Type </h2>
										<i v-if="!dropdownVisibility[0]" class="pi pi-angle-down"></i>
										<i v-else class="pi pi-angle-up"></i>
									</div>

									<div v-if="dropdownVisibility[0]" class="dropdownBody">
										<div class="option" v-for="(item, index) in invoiceTypes" v-bind:key="item.id" @click="() => {selectedType = invoiceTypes[index]; dropdownVisibility[0] = 0}">
											<h1>{{ item.name }}</h1>
										</div>
									</div>
								</div>
							</div>
							<div class="column">
								<h1>Document Number</h1>

								<input type="text" class="invoiceInput" v-model="documentNumber">
							</div>

						</div>

						<div class="row">
							<div class="column">
								<h1>Document Date</h1>

								<Calendar v-model="documentDate" showIcon />
							</div>
							<div class="column">
								<h1>VAT (%)</h1>
								
								<input type="text" class="invoiceInput" v-model="tvaValue">
							</div>
						</div>
            <div class="row">
              <div class="column">
                <h1>Document Currency</h1>

                <div class="dropdownWrap" @click="() => {(dropdownVisibility[1]) ? dropdownVisibility[1]++ : dropdownVisibility[1]--}">
                  <div class="dropdownHeader">
                    <h1 v-if="invoiceCurrency"> {{ invoiceCurrency }} </h1>
                    <h2 v-else>Choose Document Currency</h2>
                    <i v-if="!dropdownVisibility[1]" class="pi pi-angle-down"></i>
                    <i v-else class="pi pi-angle-up"></i>
                  </div>

                  <div v-if="dropdownVisibility[1]" class="dropdownBody">
                    <div class="option" v-for="(item, index) in currencyTypes" v-bind:key="item.id" @click="() => {invoiceCurrency = currencyTypes[index].name; dropdownVisibility[1] = 0}">
                      <h1>{{ item.name }}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
				</AccordionTab>
				<AccordionTab header="Company Information and Logo">
          <div class="accordionSection">
						<div class="column">
							<div class="row">
								<h1>Company Name</h1>
								<input type="text" class="invoiceInput" v-model="company.name">
              </div>
							<div class="row">
                <Checkbox v-model="company.orgReg.isActive" :binary="true" />

								<h1>{{ company.orgReg.name }}</h1>
								<input type="text" class="invoiceInput" v-model="company.orgReg.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.cif.isActive" :binary="true" />

								<h1>{{ company.cif.name }}</h1>
								<input type="text" class="invoiceInput" v-model="company.cif.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.address.isActive" :binary="true" />

								<h1>{{ company.address.name }}</h1>
								<input type="text" class="invoiceInput" v-model="company.address.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.bank.isActive" :binary="true" />

								<h1>{{ company.bank.name }}</h1>
								<input type="text" class="invoiceInput" v-model="company.bank.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.account.isActive" :binary="true" />

								<h1>{{ company.account.name }}</h1>
                <div class="dropdownWrap" @click="() => {(dropdownVisibility[2]) ? dropdownVisibility[2]++ : dropdownVisibility[2]--}">
									<div class="dropdownHeader">
										<h1 v-if="company.account.currency"> {{ company.account.currency }} </h1>
										<h2 v-else>Account Currency</h2>
										<i v-if="!dropdownVisibility[2]" class="pi pi-angle-down"></i>
										<i v-else class="pi pi-angle-up"></i>
									</div>

									<div v-if="dropdownVisibility[2]" class="dropdownBody">
										<div class="option" v-for="(item, index) in currencyTypes" v-bind:key="item.id" @click="() => {company.account.currency = currencyTypes[index].name; dropdownVisibility[2] = 0}">
											<h1>{{ item.name }}</h1>
										</div>
									</div>
								</div>
								<input type="text" class="invoiceInput" v-model="company.account.value">
              </div>
						</div>
					</div>
				</AccordionTab>
				<AccordionTab header="Client Information">
          <div class="accordionSection">
						<div class="column">
							<div class="row">
								<h1>Client Name</h1>
								<input type="text" class="invoiceInput" v-model="client.name">
              </div>
							<div class="row">
                <Checkbox v-model="company.orgReg.isActive" :binary="true" />

								<h1>{{ client.orgReg.name }}</h1>
								<input type="text" class="invoiceInput" v-model="client.orgReg.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.cif.isActive" :binary="true" />

								<h1>{{ client.cif.name }}</h1>
								<input type="text" class="invoiceInput" v-model="client.cif.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.address.isActive" :binary="true" />

								<h1>{{ client.address.name }}</h1>
								<input type="text" class="invoiceInput" v-model="client.address.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.bank.isActive" :binary="true" />

								<h1>{{ client.bank.name }}</h1>
								<input type="text" class="invoiceInput" v-model="client.bank.value">
              </div>
							<div class="row">
                <Checkbox v-model="company.account.isActive" :binary="true" />

								<h1>{{ client.account.name }}</h1>
                <div class="dropdownWrap" @click="() => {(dropdownVisibility[3]) ? dropdownVisibility[3]++ : dropdownVisibility[3]--}">
									<div class="dropdownHeader">
										<h1 v-if="client.account.currency"> {{ client.account.currency }} </h1>
										<h2 v-else>Account Currency</h2>
										<i v-if="!dropdownVisibility[3]" class="pi pi-angle-down"></i>
										<i v-else class="pi pi-angle-up"></i>
									</div>

									<div v-if="dropdownVisibility[3]" class="dropdownBody">
										<div class="option" v-for="(item, index) in currencyTypes" v-bind:key="item.id" @click="() => {client.account.currency = currencyTypes[index].name; dropdownVisibility[3] = 0}">
											<h1>{{ item.name }}</h1>
										</div>
									</div>
								</div>
								<input type="text" class="invoiceInput" v-model="client.account.value">
              </div>
						</div>
					</div>
				</AccordionTab>
				<AccordionTab header="Products">
					<div class="productsTable">
						<div class="productsTableControls">
							<h1>Products</h1>

							<div class="smallPrimaryButton" @click="addNewProduct()">
								<h1>Add Product</h1>
							</div>
						</div>
						<div class="productsTableHeader">
							<h1>Number</h1>
							<h1>Name</h1>
							<h1>Unit Price</h1>
							<h1>Quantity</h1>
							<h1>Quantity Price</h1>
						</div>
						<div v-if="productsList.length > 0" class="productsTableBody">
							<div v-for="product in productsList" v-bind:key="product.id" class="productsTableRow">
								<h1>{{ product.id }}</h1>
								<input v-model="product.name" />
								<input v-model="product.uPrice" />
								<input v-model="product.quantity" />
								<h1>{{ product.qPrice }}</h1>
							</div>
						</div>
            <div v-else class="productsTableBody">
              <div class="productsTableRow">
                <h1>No products added.</h1>
              </div>
            </div>
					</div>
				</AccordionTab>
				<AccordionTab header="Add Message">
					<h1>Message</h1>
          <Textarea v-model="invoiceAddedNote" rows="3" cols="100" />
				</AccordionTab>
			</Accordion>

			<div class="actionButtons">
				<div class="smallSecondaryButton" @click="reloadPage()">
					<h1>Reset</h1>
				</div>
				<div class="smallPrimaryButton" @click="downloadProcess">
					<h1>Save</h1>
				</div>
			</div>
		</div>

		<div class="generatedSection">
			<div class="invoiceCard">
				<div id="invoice">
					<div class="invDivider">
						<div class="invImg">
							<img src="../../assets/img/defaultCompany.png"/>
						</div>
						
						<div class="invDocInfo">
							<div>
								<h1>{{ (selectedType) ? selectedType.name : "DOC TYPE" }}</h1>
								<h1>{{ documentNumber }}</h1>
							</div>

							<div>
								<h2>DATE: {{ dateOnInvoice }}</h2>
								<h2>VAT: {{ tvaValue }}%</h2>
							</div>

							<div class="totalRow">
								<h1>TOTAL: </h1>
								<h1> {{ invoiceTotal + " " + invoiceCurrency }}</h1>
							</div>
						</div>
					</div>

					<div class="invDivider">
						<div class="companyInfo">
							<h1>BENEFICIARY</h1>
							<h2>{{ company.name }}</h2>
							<h3 v-if="company.orgReg.isActive"><span> {{ company.orgReg.name }}: </span> {{ company.orgReg.value }} </h3>
							<h3 v-if="company.cif.isActive"><span> {{ company.cif.name }}: </span> {{ company.cif.value }} </h3>
							<h3 v-if="company.address.isActive"><span> {{ company.address.name }}: </span> {{ company.address.value }} </h3>
							<h3 v-if="company.bank.isActive"><span> {{ company.bank.name }}: </span> {{ company.bank.value }} </h3>
							<h3 v-if="company.account.isActive"><span> {{ company.account.name + "(" + company.account.currency + ")" }}: </span> {{ company.account.value }} </h3>
						</div>

						<div class="companyInfo">
							<h1>CLIENT</h1>
							<h2>{{ client.name }}</h2>
							<h3 v-if="company.orgReg.isActive"><span> {{ client.orgReg.name }}: </span> {{ client.orgReg.value }} </h3>
							<h3 v-if="company.cif.isActive"><span> {{ client.cif.name }}: </span> {{ client.cif.value }} </h3>
							<h3 v-if="company.address.isActive"><span> {{ client.address.name }}: </span> {{ client.address.value }} </h3>
							<h3 v-if="company.bank.isActive"><span> {{ client.bank.name }}: </span> {{ client.bank.value }} </h3>
							<h3 v-if="company.account.isActive"><span> {{ client.account.name + "(" + client.account.currency + ")" }}: </span> {{ client.account.value }} </h3>
						</div>
					</div>
					
					<div class="dataTableDiv">
						<DataTable :value="productsList">
							<Column field="id" header="Number"></Column>
							<Column field="name" header="Name"></Column>
							<Column field="uPrice" header="Unit Price"></Column>
							<Column field="quantity" header="Quantity"></Column>
							<Column field="qPrice" header="Quantity Price"></Column>
						</DataTable>

						<div class="invDivider2">
							<div class="totalRows">
								<div>
									<h2>SUBTOTAL:</h2>
									<h2>VAT:</h2>
									<h1>TOTAL:</h1>
								</div>
								<div>
									<h2>{{ invoiceSubtotal + " " + invoiceCurrency}}</h2>
									<h2>{{ invoiceTvaTotal + " " + invoiceCurrency}}</h2>
									<h1>{{ invoiceTotal + " " + invoiceCurrency}}</h1>
								</div>
							</div>
							<div class="signSection">
								<div>
									<h2>Signature: </h2>
								</div>
							</div>
						</div>

						<div class="invFooterBox">
							<div class="smallDetails">
								<h1> {{ company.name }} </h1>
								<h2>Capital: 200 RON</h2>
								<h2>Telefon: 0365 424 422 ; Fax: 0365 424 423</h2>
								<h2>Email: test@test.com</h2>
								<h2>IBAN(EUR): RO123OTP123123123123 ; Bank: OTP</h2>
							</div>
							<div class="mentionBox">
								<h3 style="white-space: pre-line;">Mention: {{ invoiceAddedNote }}</h3>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>

</div>
</template>

<script>
// packages
import { jsPDF } from 'jspdf';
import domtoimage from "dom-to-image";
import { toRefs, reactive } from 'vue';

// templates
import MessageWindow from '../support/MessageWindow.vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea';


export default{
	name: "InvoiceCreator",
	components: {
		MessageWindow,
		Accordion,
		AccordionTab,
		Calendar,
		DataTable,
		Column,
    Checkbox,
    Textarea
	},
	setup(){
		const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
		
		const documentInfo = reactive({
			documentNumber: 0,
			tvaValue: 19,
      selectedType: null,

      documentDate: new Date(),
      dateOnInvoice: null,
      productsList: [],

      invoiceSubtotal: 0,
      invoiceTvaTotal: 0,
      invoiceTotal: 0,

      invoiceCurrency: 'RON',

      invoiceAddedNote: '',
      
      company: {
        name: 'NAME',
        orgReg: {
          name: 'Company Registration Number',
          isActive: true,
          value: '',
        },
        cif: {
          name: 'Customer Identification File',
          isActive: true,
          value: '',
        },
        address: {
          name: 'Address',
          isActive: true,
          value: '',
        },
        bank: {
          name: 'Bank',
          isActive: true,
          value: '',
        },
        account: {
          name: 'Account - IBAN',
          currency: 'RON',
          isActive: true,
          value: '',
        },
      },
      client: {
        name: 'NAME',
        orgReg: {
          name: 'Company Registration Number',
          value: '',
        },
        cif: {
          name: 'Customer Identification File',
          value: '',
        },
        address: {
          name: 'Address',
          value: '',
        },
        bank: {
          name: 'Bank',
          value: '',
        },
        account: {
          name: 'Account - IBAN',
          currency: 'RON',
          value: '',
        },
      },

		})

		return{
			loggedUser,
			...toRefs(documentInfo)
		}
	},
	data(){
		return{
			messageBoardContent: null,

			bottomSectionController: 0,

			dropdownVisibility: [0, 0, 0, 0],
			invoiceTypes: [
				{
					id: 0,
					name: "FISCAL INVOICE"
				},
				{
					id: 1,
					name: "PROFORMA INVOICE"
				},
			],
			currencyTypes: [
				{
					id: 0,
					name: "RON"
				},
				{
					id: 1,
					name: "EUR"
				},
			],

		}
	},
	watch: {
		documentDate: function(value){
			this.dateOnInvoice = value.toLocaleDateString("en-US");
		},
		productsList: {
			handler(val) {
				val.forEach(item => {
					item.qPrice = Number(item.uPrice) * Number(item.quantity);
				});

				this.updatePricesAndTotals();
			},
			deep: true
		},
	},
	mounted(){
		this.dateOnInvoice = this.documentDate.toLocaleDateString("en-US");
	},
	methods:{
    downloadProcess(){
      let itemListLength = this.productsList.length;
      let height;
      let docName = "INVOICE_" + "SERIALNR" + "_" + "DATE" + "_" + "CLIENTNAME" + ".pdf";

			domtoimage.toJpeg(document.getElementById("invoice"), { quality: 1 })
			.then(function (dataUrl) {
				let img = dataUrl;
				let doc = new jsPDF();
				height = 200;
				height = height + (itemListLength * 40);

				(height > 300) ? height = 300 : height;

				doc.addImage(img, 'JPEG', 5, 5, 200, height);
				doc.save(docName);
			});
    },
    reloadPage(){
      location.reload();
    },
		clickListener(event){
			if(event.target.className != "dropdownHeader"){
				for(let i = 0; i < this.dropdownVisibility.length; ++i){
					this.dropdownVisibility[i] = 0;
				}
			}
		},
		addNewProduct(){
			let newProduct = {
				id: this.productsList.length + 1,
				name: "New Product",
				uPrice: 1,
				quantity: 1,
				qPrice: 1,
			}
			this.productsList.push(newProduct);

			console.log(this.productsList);
		},
		updatePricesAndTotals(){
			this.invoiceSubtotal = 0;
			this.invoiceTvaTotal = 0;
			this.invoiceTotal = 0;

			this.productsList.forEach((item) => {
				this.invoiceSubtotal += Number(item.qPrice);
			})

			this.invoiceTvaTotal = ((Number(this.invoiceSubtotal) * Number(this.tvaValue)) / 100);
			this.invoiceTotal = (Number(this.invoiceSubtotal) + Number(this.invoiceTvaTotal)).toFixed(2);
			

			this.invoiceTvaTotal = this.invoiceTvaTotal.toFixed(2);
			this.invoiceSubtotal = this.invoiceSubtotal.toFixed(2);
		}
	}
}
</script>