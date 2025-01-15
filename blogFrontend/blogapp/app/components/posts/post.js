"use client"
import { useState, useEffect } from "react";
import { getPosts } from '../../api/api';
import Spinner from "../spinner/spinner";
import Card from "../card/card";
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';
export default function PostPage({posts, setPosts, loading}){
    
   

     if(loading){
        return <Spinner />;
     }
     if (posts.length === 0) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <h2 style={{fontWeight: 'bold', fontSize:'20px'}}>No blogs found</h2>
        </div>
      );
    }
     return(
        <div style={{display : 'flex', flexWrap: 'wrap',  flexDirection: 'row' , justifyContent :'center', gap:'50px' }}>
         <ToastContainer/>
            {
                 posts.map((post=>{
                    
                   return <Card key={post.id} title ={post.title} description={post.content} time ={post.createdAt} setPosts={setPosts} id={post.id} userId={post.userId} createdAt={post.createdAt} updatedAt= {post.updatedAt}/>
                })) 
            }

        </div>
     )
}