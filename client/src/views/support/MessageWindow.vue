<template>

	<Transition name="message-slide">
		<div v-if="show" class="messageBoard">
			<div>
				<h2> New message: </h2>
				<!-- <span @click="closeMessageBoard()"> X </span> -->
			</div>

			<h1> {{ message }} </h1>
		</div>
	</Transition>

	<Transition name="timer-slide">
		<div v-if="show" class="messageBoardTimer"></div>
	</Transition>
</template>
<script>
export default{
	name: "MessageWindow",
	props: {
		message: String
	},
	mounted(){
		this.show = true
	},
	data(){
		return{
			show: false
		}
	}
}
</script>