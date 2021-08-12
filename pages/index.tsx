/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/styles.module.scss'
import SelectionItem from '../components/selection-items'
import widgets from '../widgets/styles.module.scss'

export default function Home() {
  const [status, setStatus] = useState<string>("initial")
  const [game, setGame] = useState<any>()
  const [selection, setSelection] = useState<string>("rock")
  const [opponent, setOpponent] = useState<number>(1)
  const [items, setItems] = useState<any[]>([])
  const [result, setResult] = useState<boolean>(false)
  const [faceoffImage, setFaceoffImage] = useState<number>(200)

  const uploadFields = (value: number) => {
      setStatus("loading")
      fetch("https://codechallenge.boohma.com/play", {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
            player: value
          })
      }).then(res => res.json())
          .then(data => {
              if(data.error){
                  alert(data.error)
                  setStatus("error")
              }
              else {
                setOpponent(data.computer)
                // alert(data.results)
                setStatus(data.results)
                setResult(true)
              }
          })
          .catch(err => {
              setStatus(err)
              console.log(err)
          })
  }

  useEffect(() => {
    fetch(`https://codechallenge.boohma.com/choices`)
      .then((res) => res.json())
      .then((result) => {
        setItems(result);
      });
  }, []);

  console.log(items)
  
  const opponentSelection = () => {
    if (opponent === 1) {
      return (
        <span
          className={game
            ? `${styles.actions_item} ${styles.actions_item_left} ${styles.actions_item_left_active}`
            : `${styles.actions_item} ${styles.actions_item_left}`
          }
        >
          <span className={`fs-20 ${styles.player_name}`}><b>OPPONENT</b></span>
          <br />
          <Image src="/icons/rock.svg" alt="rock" width={faceoffImage} height={faceoffImage} />
          <br />
          <span className={`font-1 fs-35 ${styles.actions_text}`}>ROCK</span>
        </span>
      )
    } else if(opponent === 2) {
      return (
        <span
          className={game
            ? `${styles.actions_item} ${styles.actions_item_left} ${styles.actions_item_left_active}`
            : `${styles.actions_item} ${styles.actions_item_left}`
          }
        >
          <span className={`fs-20 ${styles.player_name}`}><b>OPPONENT</b></span>
          <br />
          <Image src="/icons/paper.svg" alt="paper" width={faceoffImage} height={faceoffImage} />
          <br />
          <span className={`font-1 fs-35 ${styles.actions_text}`}>PAPER</span>
        </span>
      )
    } else if(opponent === 3) {
      return (
        <span
          className={game
            ? `${styles.actions_item} ${styles.actions_item_left} ${styles.actions_item_left_active}`
            : `${styles.actions_item} ${styles.actions_item_left}`
          }
        >
          <span className={`fs-20 ${styles.player_name}`}><b>OPPONENT</b></span>
          <br />
          <Image src="/icons/scissors.svg" alt="scissors" width={faceoffImage} height={faceoffImage} />
          <br />
          <span className={`font-1 fs-35 ${styles.actions_text}`}>SCISSORS</span>
        </span>
      )
    } else if(opponent === 4) {
      return (
        <span
          className={game
            ? `${styles.actions_item} ${styles.actions_item_left} ${styles.actions_item_left_active}`
            : `${styles.actions_item} ${styles.actions_item_left}`
          }
        >
          <span className={`fs-20 ${styles.player_name}`}><b>OPPONENT</b></span>
          <br />
          <Image src="/icons/lizard.svg" alt="lizard" width={faceoffImage} height={faceoffImage} />
          <br />
          <span className={`font-1 fs-35 ${styles.actions_text}`}>LIZARD</span>
        </span>
      )
    } else if(opponent === 5) {
      return (
        <span
          className={game
            ? `${styles.actions_item} ${styles.actions_item_left} ${styles.actions_item_left_active}`
            : `${styles.actions_item} ${styles.actions_item_left}`
          }
        >
          <span className={`fs-20 ${styles.player_name}`}><b>OPPONENT</b></span>
          <br />
          <Image src="/icons/spock.svg" alt="spock" width={faceoffImage} height={faceoffImage} />
          <br />
          <span className={`font-1 fs-35 ${styles.actions_text}`}>SPOCK</span>
        </span>
      )
    }
  }

  const statusValue = () => {
    if (status === "initial") {
      return (
        <div>The other player is waiting. Let's see if you can win this!</div>
      )
    } else if (status === "loading") {
      return (
        <div>Please wait...</div>
      )
    } else if (status === "error") {
      return (
        <div>Oops! I fear your internet connection might be faulty. Reload this page and try again.</div>
      )
    } else if (status === "win") {
      return (
        <div>I knew you were good at this! You won!</div>
      )
    } else if (status === "lose") {
      return (
        <div>Oh oh! You lost. I think you should try again.</div>
      )
    } else if (status === "tie") {
      return (
        <div>And that is a tie! Try again.</div>
      )
    }
  }
  
  const resultComponent = () => {
    if (status === "win") {
      return (
        <div className={`${styles.popup_background} ${styles.popup_background_1}`}>
          <div onClick={() => setResult(false)}>
            <Image src={`/icons/happy.svg`} alt={selection} width={100} height={100} />
            <div className={`font-1 fs-35 ${styles.popup_title}`}><h1>YOU WIN!</h1></div>
            <div>Click to play again! <Image src={`/icons/cursor.svg`} alt={selection} width={15} height={15} /></div>
          </div>
        </div>
        
      )
    } else if (status === "lose") {
      return (
        <div className={`${styles.popup_background} ${styles.popup_background_2}`}>
          <div onClick={() => setResult(false)}>
            <Image src={`/icons/sad.svg`} alt={selection} width={100} height={100} />
            <div className={`font-1 fs-35 ${styles.popup_title}`}><h1>YOU LOSE!</h1></div>
            <div>Click to play again! <Image src={`/icons/cursor.svg`} alt={selection} width={15} height={15} /></div>
          </div>
        </div>
        
      )
    } else if (status === "tie") {
      return (
        <div className={`${styles.popup_background} ${styles.popup_background_3}`}>
          <div onClick={() => setResult(false)}>
            <Image src={`/icons/smile.svg`} alt={selection} width={100} height={100} />
            <div className={`font-1 fs-35 ${styles.popup_title}`}><h1>YOU TIED!</h1></div>
            <div>Click to play again! <Image src={`/icons/cursor.svg`} alt={selection} width={15} height={15} /></div>
          </div>
        </div>
        
      )
    }
  }

  useEffect(() => {
    if(window.matchMedia("(max-width: 700px)").matches){
      setFaceoffImage(50)
    }
  }, [])
  
  
  return (
    <div className={styles.container}>
      <Head>
        <title>RPSLS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={game ? `${styles.selections} ${styles.selections_active}` : styles.selections}>
          <div className={styles.title}>
            Pick your poison!
          </div>
          <div>{statusValue()}</div>
          <div className={styles.options}>
            {items.map(item => {
              return (
                <span
                  key={item?.id}
                  className={game === item?.id
                    ? `${styles.options_item_active} ${styles.options_item}`
                    : styles.options_item
                  }
                  onClick={() => {
                    setGame(item?.id)
                    setSelection(item?.name)
                    uploadFields(item?.id)
                  }}
                >
                  <Image src={`/icons/${item?.name}.svg`} alt={item?.name} width={50} height={50} />
                  <span className={styles.tooltip}>{item?.name}</span>
                </span>
              )
            })}
          </div>
        </div>
        <div className={styles.actions}>
          {opponentSelection()}
          <span className={game ? `${styles.vs} ${styles.vs_active}` : `${styles.vs}`}>
            <Image src="/icons/vs.svg" alt="scissors" width={50} height={50} />
          </span>
          <span
            className={game
              ? `${styles.actions_item} ${styles.actions_item_right} ${styles.actions_item_right_active}`
              : `${styles.actions_item} ${styles.actions_item_right}`
            }
          >
            <span className={`fs-20 ${styles.player_name}`}><b>YOU</b></span>
            <br />
            <Image src={`/icons/${selection}.svg`} alt={selection} width={faceoffImage} height={faceoffImage} />
            <br />
            <span className={`font-1 fs-35 ${styles.actions_text}`}>{selection}</span>
          </span>
          <div className={game ? `${styles.start_over} ${styles.start_over_active}` : styles.start_over} onClick={() => setGame(false)}>
            <div>START OVER! <Image src={`/icons/cursor.svg`} alt={selection} width={15} height={15} /></div>
          </div>
        </div>

        <div className={result ? `${styles.popup} ${styles.popup_active}` : styles.popup}>
          {resultComponent()}
        </div>
      </main>

      <footer className={styles.footer}>
          {/* Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>, */}
        <div>
          Resources gotten from <a href="https://www.flaticon.com" className="link" target="_blank" rel="noopener noreferrer"> FreePik, </a><a href="https://www.freepik.com" className="link" target="_blank" rel="noopener noreferrer">FlatIcon,</a> and <a href="https://fonts.google.com" className="link" target="_blank" rel="noopener noreferrer">Google Fonts</a>
        </div>
          
      </footer>
    </div>
  )
}
