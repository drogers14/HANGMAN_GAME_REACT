import React from 'react';
import './App.css';

//DisplayWord
//WrongLetters
//
var xhr;
/*class Picture extends React.Component{
	constructor(props){
		super(props);
		this.state={
			//	bodyparts: [head(), mouth()]
		};
	}
	componentDidMount(){
		this.updateCanvas();
	}
	drawCircle(x, y, r){
		const ctx = this.refs.canvas.getContext('2d');
		ctx.beginPath();
		ctx.arc(x, y, r, 0, 2*Math.PI);
	}
	head(){
		const ctx = this.refs.canvas.getContext('2d');
		ctx.scale(1.5, 1);
		ctx.fillStyle = '#999999'
		ctx.beginPath()
		ctx.arc(170 + -50, -8 + 10 + 140 - 50, 45, -0.3, Math.PI + 0.3)
		ctx.lineTo(130 + -50, -8 + 115 - 150 + 140 - 50)
		ctx.lineTo(155 + -50, -8 + 133 - 150 + 140 - 50)
		ctx.lineTo(185 + -50, -8 + 133 - 150 + 140 - 50)
		ctx.lineTo(208 + -50, -8 + 114 - 150 + 140 - 50)
		ctx.lineTo(213 + -50, -8 + 149 - 150 + 140 - 50)
		ctx.stroke()
		ctx.fill()

		ctx.fillStyle = '#FF8B93'
		this.drawCircle(-70 + 210 + -50, -8 + 175 - 150 + 140 - 50, 10)
		ctx.fill()
		this.drawCircle(-70 + 270 + -50, -8 + 175 - 150 + 140 - 50, 10)
		ctx.fill()
	}
	mouth(){
		const ctx = this.refs.canvas.getContext('2d');
		ctx.fillStyle = 'black';
		this.drawCircle(-70 + 260 + -50, -8 + 158 - 150 + 140 - 50, 7);
		ctx.fill();
		this.drawCircle(-70 + 220 + -50, -8 + 158 - 150 + 140 - 50, 7);
		ctx.fill();
	}
	updateCanvas(){
		const ctx = this.refs.canvas.getContext('2d');
		this.head();
		this.mouth();
	}
	render(){
		return(
			<canvas ref="canvas" width={300} height={300}/>
		);
	}
}*/
class DisplayWord extends React.Component{
       render(){
       const WordLetters = this.props.word.split('')
			const answer = WordLetters.map(letter=> {
				let letterState = '_'
				if(this.props.guessedLetters.includes(letter)){
					letterState = letter + ' '
				}
				return letterState + ' '
			})
			return (
				<div>
				<h1>{this.props.word}</h1>
				<h1>{answer}</h1>
				</div>
			);
		}

		};
class WrongGuess extends React.Component{
	getWrongLetter(){
		const wrong =this.props.guessedLetters.filter(letter =>{
	        return !this.props.word.split('').includes(letter)
		})
		return wrong
	}

	render() { 
		return ( 
			<div>
			{this.getWrongLetter()}
			</div>
		);
	}
};


class Game extends React.Component{
	constructor(props, context) {
		super(props, context);

		this.state = {
			word: "...",
			guessedLetters: []
		};

		this.processRequest = this.processRequest.bind(this);
	}

	componentDidMount() {
		xhr = new XMLHttpRequest();
		xhr.open('GET', "https://api.datamuse.com/words?topics=animals", true);
		xhr.send();

		xhr.addEventListener("readystatechange", this.processRequest, false);
	}

	processRequest() {
		if (xhr.readyState == 4 && xhr.status == 200) {
			var response = JSON.parse(xhr.responseText);

			this.setState({
				word:response[Math.floor(Math.random() * response.length)].word 
			});
		}
	}
	updateGuessedLetters(e){
		if(this.state.guessedLetters.includes(e)){}
		else{
		this.setState({
			guessedLetters: [...this.state.guessedLetters, e]
		})
		}
	}
	render(){
		return(
			<div>
			<h1>Word Guessing Game</h1>
			<p>Are you kitten me right meow?</p>
			{this.state.word}
			<DisplayWord word={this.state.word} guessedLetters={this.state.guessedLetters}/>
			<WrongGuess word={this.state.word} guessedLetters={this.state.guessedLetters}/>
			</div>
		);
	}
};
//ReactDOM.render(<Game />, document.getElementById("root"));
export default Game 
