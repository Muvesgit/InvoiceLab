<template>
<div>
  
	<Transition name="message-slide">
		<div v-if="show" class="messageBoard">
			<div>
				<h2> New message: </h2>
			</div>

			<h1> {{ message }} </h1>
		</div>
	</Transition>

	<Transition name="timer-slide">
		<div v-if="show" class="messageBoardTimer"></div>
	</Transition>

</div>
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