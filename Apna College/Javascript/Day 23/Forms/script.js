let f=document.querySelector('form')

f.addEventListener("submit",function(event)
{
    event.preventDefault();
    let user=this.querySelector("#user"); //document can also be used in place of this
    let key=this.querySelector("#key");

    console.log(user.value);
    console.log(key.value);

    alert(`Hi ${user.value} password set to ${key.value}`)
})