<template>
	<div class="">
		<h1> {{ messageValue }} </h1>
		<span class="redStar" @click="closeMessageBoard()"><b> X </b></span>
	</div>
</template>
<script>
export default{
	name: "MessageWindow",
	props: {
		message: String
	}
}
</script>