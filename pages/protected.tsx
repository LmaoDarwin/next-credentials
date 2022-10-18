import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Router from 'next/router';
import { useEffect, useState } from 'react';

const Protected: NextPage = (): JSX.Element => {
  const { data, status } = useSession();
  const [dataFetch, setData] = useState<{website:string}[]>();
  const [loading, setLoading] = useState(false);
    console.log(data);
    
  const fetchData = async () => {
    setLoading(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users?name=${data?.user?.name}`
    );
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  useEffect(() => {
    if (status === 'unauthenticated') Router.replace('/auth/signin');
  }, [status]);
  if (status === 'authenticated') {
    return (
      <div>
        this page is protected <br />
        {JSON.stringify(data.user)}
        <br />
        <button onClick={() => fetchData()}>Click to see more</button>
        {!loading && dataFetch ? <div>{dataFetch[0].website}</div> : null}
      </div>
    );
  }

  return <div>Loading</div>;
};

export default Protected;
