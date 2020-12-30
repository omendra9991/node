var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)
var server = require('../app');


describe('Department', () => {
    
      it('it should GET all the Department list', (done) => {
        chai.request(server)
          .get('/department')
          .end((err, res) => {
            // console.log(res);
                (res).should.have.status(200);
                done();
          });
      });

    //   it('it should Add the employee in Database', (done) => {
        // let department = {
        //    "deptName": "IT",
        //     "deptCode": "2345",
        //     "details": ""
        // }
    //     chai.request(server)
    //       .post('/addDepartment/')
    //       .send(department)
    //       .end((err, res) => {
    //             console.log(res);
    //             (res).should.have.status(200);
    //             done();
                
    //          });
    //     });
    
      it('it should GET  the department with ID', (done) => {
      chai.request(server)
        .get('/department/5fd21545e562b513b0035fd6')
        .end((err, res) => {
            // console.log(res);
              (res).should.have.status(200);
              done();
           });
      });
    //   it('it should delete  the department with ID', (done) => {
    //     chai.request(server)
    //       .delete('/department/5fd21545e562b513b0035fd6')
    //       .end((err, res) => {
    //           // console.log(res);
    //             (res).should.have.status(200);
    //             done();
    //          });
    //     });

    // it('it should update the department with id in Database', (done) => {
    //     let department = {
    //         "deptName": "IT",
    //          "deptCode": "23E5",
    //          "details": ""
    //      }
    //     chai.request(server)
    //       .put('/department/5fd21545e562b513b0035fd6')
    //       .send(department)
    //       .end((err, res) => {
    //             (res).should.have.status(200);
    //             done();
                
    //          });
    // });
  
});