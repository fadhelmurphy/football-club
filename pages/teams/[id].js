import Head from "next/head";
import { Container, Nav, Navbar, NavDropdown, Col, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { List, Card, Input, Pagination } from "antd";
import { useState } from "react";
import Layout from "../../layout/";
import Link from "next/link";

export default function Home({ teams }) {
  const [state, setstate] = useState({
    filtered: null,
    thedata: teams,
    minValue: 0,
    maxValue: 8
  });
  const filterData = (value) => {
    var { thedata } = state;
    return thedata.filter(
      (user) => user.name.toLowerCase().search(value.toLowerCase()) != -1
    );
  };
  const onChange = (e) => {
    const { value } = e.target;
    var filtered = "";
    filtered = filterData(value);

    setstate((prev) => ({
      ...prev,
      filtered
    }));
  };
  const numEachPage = 8;
  const handleChange = (value) => {
    setstate((prev) => ({
      ...prev,
      minValue: (value - 1) * numEachPage,
      maxValue: value * numEachPage
    }));
  };
  const { thedata, filtered } = state;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        title={
          thedata.length > 0 ? (
            <>
              <span style={{ color: "#59e1f7" }}>{thedata[0].area.name}</span>{" "}
              Region
            </>
          ) : (
            "Data Kosong"
          )
        }
        desc={
          thedata.length > 0
            ? "Select your team"
            : "Mohon maaf detail data yang anda cari tidak ada"
        }
      >
        <Input
          size="large"
          className="mb-5"
          onChange={onChange}
          placeholder="Search..."
        />
        <Row className="g-3">
          {(filtered || thedata) &&
            (filtered || thedata).length > 0 &&
            (filtered || thedata)
              .slice(state.minValue, state.maxValue)
              .map((val, i) => (
                <>
                  <Col className="mb-3 m-md-0 rounded-lg">
                    <Link href={"/club/" + val.id}>
                      <Card
                        className="border border-white c-shadow-lg"
                        // title={val.name}
                        // extra={<a href="#">More</a>}
                      >
                        <Row>
                          <Col xs="12" md="4" className="align-self-center">
                            <img style={{
                              display:'block',
                              margin:"0 auto",
                              width:"100%"
                            }} src={val.crestUrl} />
                          </Col>
                          <Col xs="12" md="8" className="align-self-center">
                            <h4>{val.name}</h4>
                          </Col>
                        </Row>
                      </Card>
                    </Link>
                  </Col>
                  {numEachPage / 2 == i + 1 && <div className="w-100"></div>}
                </>
              ))}
        </Row>
        <Pagination
          className="mt-5"
          defaultCurrent={1}
          defaultPageSize={numEachPage} //default size of page
          onChange={handleChange}
          total={thedata.length} //total number of card data available
        />
      </Layout>
    </>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { id } = await params;
    const res = await fetch(
      `https://api.football-data.org/v2/teams?areas=${id}`,
      {
        method: "GET",
        headers: new Headers({
          "X-Auth-Token": "fd956ab7a1694826b8987aec5974ff2d",
          "Content-Type": "application/x-www-form-urlencoded"
        })
      }
    );
    const data = await res.json();

    return {
      props: { ...data } // will be passed to the page component as props
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/404",
        permanent: false
      }
    };
  }
}
