import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import firebase from '../src/config/firebase.config';
import { IEvent } from '../src/types/event';

export type Props = {
  events: IEvent[];
};

const Home: FC<Props> = ({ events }) => (
  <div>
    {events.map((event) => (
      <div key={event.id}>{event.title}</div>
    ))}
  </div>
);

export const getStaticProps: GetStaticProps = async () => {
  const res = await firebase.firestore().collection('events').get();

  const events = res.docs
    .map((doc) => ({ id: doc.id, data: doc.data() }))
    .map(({ id, data }) => ({
      id,
      ...data,
      date: new Date(data.date.seconds * 1000).toLocaleString()
    }));

  return {
    props: {
      events
    }
  };
};

export default Home;
