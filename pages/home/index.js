import React, { useEffect, useState } from 'react'

import Head from 'next/head'

import Devit from 'components/Devit'

import useUser from 'hooks/useUser'

import { listenLatestDevits } from 'my-firebase/client'

import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'
import Link from 'next/link'

import { colors } from 'styles/themes'

export default function HomePage () {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unSubscribe

    if (user) {
      unSubscribe = listenLatestDevits(setTimeline)
    }

    return () => unSubscribe && unSubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio / Devter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(devit => (
          <Devit
            key={devit.id}
            avatar={devit.avatar}
            id={devit.id}
            content={devit.content}
            username={devit.username}
            userId={user.userId}
            createdAt={devit.createdAt}
            image={devit.img}
          />
        ))}
      </section>
      <nav>
        <Link className='nav-icons' href='/home'>
          <Home width={32} height={32} stroke='#09f' />
        </Link>
        <Link className='nav-icons' href='/search'>
          <Search width={32} height={32} stroke='#09f' />
        </Link>
        <Link className='nav-icons' href='/compose/devit'>
          <Create width={32} height={32} stroke='#09f' />
        </Link>
      </nav>
      <style jsx>{`
        header {
          align-items: center;
          background: #ffffffbb;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          display: flex;
          height: 49px;
          top: 0;
          position: sticky;
          width: 100%;
        }

        h2 {
          font-size: 21px;
          font-weight: 799;
        }

        section {
          flex: 1;
        }

        nav {
          background: #fff;
          border-top: 1px solid #eee;
          bottom: 0;
          display: flex;
          height: 56px;
          position: sticky;
          width: 100%;
        }

        nav > :global(a) {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          justify-content: center;
        }

        nav > :global(a):hover {
          background: radial-gradient(#0099ff22 20%, transparent 16%);
          background-size: 100px 100px;
          background-position: center;
        }

        nav > :global(a):hover > :global(svg) {
          stroke: ${colors.secondary};
        }
      `}</style>
    </>
  )
}
