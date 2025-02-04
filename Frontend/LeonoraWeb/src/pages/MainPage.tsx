import React from "react";
import {  Container } from "@mui/material";


export default function MainPage() {
  return (
    <div>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <img
          src="/logo192.png" 
          alt="Imagem central"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      </Container>
    </div>
  );
}

