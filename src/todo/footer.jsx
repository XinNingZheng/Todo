import '../assets/styles/footer.styl'
export default {
  data() {
    return {
      author: 'XinNing'
    }
  },
  render(){
    return (
      <div id="footer">
        <span>Designned by {this.author}</span>
      </div>
    )
  }
}