<template>
<div>
	<MessageWindow v-if="messageBoardContent" :message="messageBoardContent"/>

	<div v-if="loggedUser">
		<div class="profileTopSection">
			<div class="profileCard">
				<img src="../../assets/img/defaultAvatar1.png"/>
				<div>
					<h2>My Profile</h2>
					<h1>{{ loggedUser.firstName + " " + loggedUser.lastName }}</h1>

					<div class="smallPrimaryButton">
						<h1>Edit</h1>
					</div>
				</div>
			</div>

			<div class="companyCard">
				<img src="../../assets/img/defaultCompany.png"/>
				<div>
					<h2>My Company</h2>
					<h1>Coming soon</h1>
					
					<div class="smallPrimaryButton">
						<h1>Edit</h1>
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
				<i class="pi pi-check" @click="() => {(bottomSectionController > 0) ? bottomSectionController-- : bottomSectionController}"></i>

				<div v-if="bottomSectionController == 0" class="contentSection">
					<div>
						<h1>Edit Clients</h1>
						<h2>Coming soon</h2>
					</div>
				</div>

				<div v-if="bottomSectionController == 1" class="contentSection">
					<div>
						<h1>Edit Products</h1>
						<h2>Coming soon</h2>
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

				<i class="pi pi-check" @click="() => {(bottomSectionController < 3) ? bottomSectionController++ : bottomSectionController}"></i>
			</div>
		</div>
		
	</div>

	<UserAuth v-else />
</div>
</template>

<script>
import MessageWindow from '../support/MessageWindow.vue'
import UserAuth from '../auth/Auth.vue'

export default{
	name: "ProfilePage",
	components: {
		MessageWindow,
		UserAuth
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

	}
}
</script>