import firebase from "../src/config/firebase.config";

export interface IHome {
  events: { id: string; title: string; date: string }[];
}

const Home = ({ events }: IHome) => {
  return (
    <div>
      {events.map((event) => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await firebase.firestore().collection("events").get();

  const events = res.docs
    .map((doc) => ({ id: doc.id, data: doc.data() }))
    .map(({ id, data }) => ({
      id,
      ...data,
      date: new Date(data.date.seconds * 1000).toLocaleString(),
    }));

  return {
    props: {
      events,
    },
  };
};

export default Home;
