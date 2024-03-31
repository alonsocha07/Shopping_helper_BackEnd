import jwt from "jsonwebtoken";
import {TOKEN_SECRET} from '../config.js'

export function createAccessToken(payload, res) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d",
            },
            (err, token) => {
                if (err) {
                    reject(err);
                }
                
                res.cookie('token', token, { 
                    httpOnly: true, 
                    secure: true, // Set secure to true
                    expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
                });
                
                resolve(token);
            }
        );
    });
}



/* export function createAccesToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
              expiresIn: "1d",
            },
            (err, token) => {
              if (err) {
                 reject(err)
              }
              resolve(token)
          }
          );
        
    })
} */