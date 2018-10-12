#!/bin/bash/env node

const Client = require('ftp');
const fs = require('fs');
const recursive = require("recursive-readdir");

const c = new Client()


const buildPath = "/home/jer/Projects/JavaScript/React/freshpeeps/build/";

recursive(buildPath,(err, files) => {
  // `files` is an array of file paths
  c.on('ready', () => {
    files.forEach(file => {
        const relPath = file.replace(buildPath, "");
        c.put(relPath, "public_html/" + relPath, err => {
          if (err) throw err;
          c.end();
        });
    });
  });
  // connect to localhost:21 as anonymous
  c.connect({
      host:"freshpeeps.com",
      user:"freshpeeps",
      password:""
  });
});