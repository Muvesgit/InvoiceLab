<template>
<div>
	<MessageWindow v-if="messageBoardContent" :message="messageBoardContent"/>

	<div class="creatorTab">
		<div class="optionSection">
			<h1>Create your invoice</h1>
			<Accordion :multiple="true" :activeIndex="[0]">
				<AccordionTab header="Invoice Information">
					<h1>Document Type, Number and Date</h1>
				</AccordionTab>
				<AccordionTab header="Company Information and Logo">
					<h1>Info and Logo</h1>
				</AccordionTab>
				<AccordionTab header="Client Information">
					<h1>Client Info</h1>
				</AccordionTab>
				<AccordionTab header="Products">
					<h1>Products</h1>
				</AccordionTab>
				<AccordionTab header="Add Message">
					<h1>Message</h1>
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
								<h1>DOC NAME</h1>
								<h1>NR</h1>
							</div>

							<div>
								<h2>DATE: DATE</h2>
								<h2>TVA: 19%</h2>
							</div>

							<div class="totalRow">
								<h1>TOTAL: </h1>
								<h1>AMOUNT {CURRENCY}</h1>
							</div>
						</div>
					</div>

					<div class="invDivider">
						<div class="companyInfo">
							<h1>COMPANY</h1>
							<h2>COMPANY NAME</h2>
							<h3><span>CIF:</span>  RO15730704</h3>
							<h3><span>COM. REG:</span>  J26/1148/2003</h3>
							<h3><span>ADDRESS:</span>  Mun. Târgu Mureș, Str. 8 Martie, Nr.59, Jud. Mureș</h3>
							<h3><span>IBAN(RON):</span>  RO49BRDE270SV06679802700</h3>
							<h3><span>BANK:</span>  BRD - GROUPE SOCIETE GENERALE</h3>
						</div>

						<div class="companyInfo">
							<h1>CLIENT</h1>
							<h2>CLIENT NAME</h2>
							<h3><span>INFO 1:</span>  TEST</h3>
							<h3><span>INFO 2:</span>  TEST</h3>
							<h3><span>INFO 3:</span>  TEST</h3>
						</div>
					</div>
					
					<div class="dataTableDiv">
						<!-- <DataTable :value="" responsiveLayout="scroll">
							<Column field="Count" header="Nr"></Column>
							<Column field="Denumire" header="Denumire"></Column>
							<Column field="UM" header="UM"></Column>
							<Column field="Cantitate" header="Cantitate"></Column>
							<Column field="PretUnitar" header="Preț Unitar (RON)"></Column>
							<Column field="PretCantitate" header="Preț Cant. (RON)"></Column>
							<Column field="TVA" header="TVA"></Column>
							<Column field="totalRowPrice" header="Preț Total (RON)"></Column>
						</DataTable> -->

						<div class="invDivider2">
							<div class="totalRows">
								<div>
									<h2>SUBTOTAL:</h2>
									<h2>TVA:</h2>
									<h1>TOTAL:</h1>
								</div>
								<div>
									<h2>X {CURR}</h2>
									<h2>X {CURR}</h2>
									<h1>X {CURR}</h1>
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
								<h1>Hidromix 2003 SRL</h1>
								<h2>Capital: 200 RON</h2>
								<h2>Telefon: 0365 424 422 ; Fax: 0365 424 423</h2>
								<h2>Email: hidromix@hidromix.com</h2>
								<h2>IBAN(EUR): RO13BRDE270SV07159702700 ; Bank: BRD - GROUPE SOCIETE GENERALE</h2>
							</div>
							<div class="mentionBox">
								<h3 style="white-space: pre-line;">Mention: Message</h3>
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

// templates
import MessageWindow from '../support/MessageWindow.vue'
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

export default{
	name: "InvoiceCreator",
	components: {
		MessageWindow,
		Accordion,
		AccordionTab
	},
	setup(){
		const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
		
		return{
			loggedUser
		}
	},
	data(){
		return{
			messageBoardContent: null,

			bottomSectionController: 0
		}
	},
	watch: {

	},
	mounted(){

	},
	methods:{
    downloadProcess(){
      // let itemListLength = this.FactOptions.length;
      let height;
      let docName = "INVOICE_" + "SERIALNR" + "_" + "DATE" + "_" + "CLIENTNAME" + ".pdf";

			domtoimage.toJpeg(document.getElementById("invoice"), { quality: 1 })
			.then(function (dataUrl) {
				let img = dataUrl;
				let doc = new jsPDF();
				height = 200;
				// height = height + (itemListLength * 5);
				// (height > 290) ? height = 290 : height;

				doc.addImage(img, 'JPEG', 5, 5, 200, height);
				doc.save(docName);
			});
    },
    reloadPage(){
      location.reload();
    }
	}
}
</script>