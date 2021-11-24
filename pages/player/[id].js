import Head from "next/head";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown, Col, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";
import { List, Card, Input, Pagination } from "antd";
import { useState } from "react";
import Layout from "../../layout/";
import Link from "next/link";

export default function Home({data}) {
  
  var today = new Date();
  var birthDate = new Date(data.dateOfBirth);
  data.age = (today.getFullYear() - birthDate.getFullYear())+" years";
  const [state, setstate] = useState({
    filtered: null,
    thedata: data,
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
      <Layout style={{minHeight:"100vh"}} title={
        <>{thedata.name}</>
      } desc={<><div className="d-flex">
        <span className="border-end px-3">{thedata.position}</span>
        <span className="border-end px-3">{thedata.age}</span>
        <span className="border-end px-3">{thedata.nationality}</span>
        </div></>}>
      </Layout>
    </>
  );
}
export async function getServerSideProps({params}) {
    try{
        const {id} = await params
        const res = await fetch(`https://api.football-data.org/v2/players/${id}`,{
            
   method: 'GET', 
   headers: new Headers({
     'X-Auth-Token': 'fd956ab7a1694826b8987aec5974ff2d', 
     'Content-Type': 'application/x-www-form-urlencoded'
   }),
        })
        const data = await res.json()
    
        return {
          props: { data }, // will be passed to the page component as props
        }
    
      }catch(e){
    
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
      }
  }