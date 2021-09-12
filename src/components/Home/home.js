import React, {useState, useEffect} from 'react';
import {Container, Grow, Grid} from '@material-ui/core';

import {getPosts} from '../../actions/posts';

import { useDispatch } from 'react-redux';
import Posts from '../posts/posts';
import Form from '../forms/form';

const Home = ()=>{
    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPosts());
      }, [currentId, dispatch]);

    return(
        <div>
            <Grow in>
              <Container>
                <Grid container justifyContent="space-between" alignItems="stretch" spacing={4}>
                    <Grid item xs={12} sm={7}>
                       <Posts setCurrentId={setCurrentId} />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Form currentId={currentId} setCurrentId={setCurrentId}/>
                   </Grid>
                </Grid>
              </Container>
            </Grow>
        </div>
    );
}

export default Home;