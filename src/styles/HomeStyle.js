import styled from "styled-components";


export const HomeDiv = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;

  
  .search_Div {
    position: relative;
    width: 400px;
    text-align: center;
    
    input {
      width: 98%;
      height: 25px;
      margin: 40px 0 0 0; 
    }

    .searchList_Div {
      border: 1px solid black;
      position: absolute;
      width: 100%;
      border-radius: 5px;
      background-color: #fff;
      box-sizing: border-box;
      height: 120px;
        
      p{
          text-align: left;
          margin: 3px 0 5px 0;
        }
      
    }
  }
  
`;

export const NewsDiv = styled.div` 
  margin: 0 auto;
  width: 800px;
  .item {
    border: 2px solid #5a5a5a;
    color: black;
    box-sizing: border-box; 
    margin-top: 20px;
    margin-bottom: 30px;
    .news {
      margin-left: 12px;
      span {
        font-size: 14px;
        font-weight: 600;
        line-height: 17px;
        color: #A5A5A5;
      }
      h2 {
        margin-top: 20px;
        font-size: 24px;
        font-weight: 800;
        line-height: 29px;
        text-align: left;
      }
      p {
        margin-top: 20px;
        font-size: 18px;
        font-weight: 500;
        line-height: 22px;
      }
    }
    .btns {
      display: flex;
      justify-content: flex-end;
      

      button {
        display: block;
        margin-left : 7px;
        display: block;
        width: 100px;
        height: 35px; 
        font-size: 1.2rem;
      } 
    }
  }
`;