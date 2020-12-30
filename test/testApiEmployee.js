var chai = require('chai')
var chaiHttp = require('chai-http')
var should = chai.should()
chai.use(chaiHttp)
var server = require('../app');


describe('Employee', () => {
    
      it('it should GET all the employee list', (done) => {
        chai.request(server)
          .get('/getEmployeeList')
          .end((err, res) => {
            // console.log(res);
                (res).should.have.status(200);
                done();
          });
      });

    //   it('it should Add the employee in Database', (done) => {
    //     let employee = {
    //       empName: "sarangTest",
    //       employeeCode: "23h6",
    //       DOJ: "2020-12-09",
    //       department: "IT",
    //     }
    //     chai.request(server)
    //       .post('/addEmployee/')
    //       .send(employee)
    //       .end((err, res) => {
    //             console.log(res);
    //             (res).should.have.status(200);
    //             done();
                
    //          });
    //     });
    
      it('it should GET  the employee with ID', (done) => {
      chai.request(server)
        .get('/getEmployee/5fe0680f1f621c1dd462cf1a')
        .end((err, res) => {
            // console.log(res);
              (res).should.have.status(200);
              done();
           });
      });
      // it('it should delete  the employee with ID', (done) => {
      //   chai.request(server)
      //     .delete('/deleteEmployee/5fe0680f1f621c1dd462cf1a')
      //     .end((err, res) => {
      //         // console.log(res);
      //           (res).should.have.status(200);
      //           done();
      //        });
      //   });

    it('it should update the employee with id in Database', (done) => {
        let employee = {
          empName: "sarangTest",
          employeeCode: "23U6",
          DOJ: "2020-12-09",
          department: "IT",
        }
        chai.request(server)
          .put('/employeeUpdate/5fcf5f04e45df04218d47caa')
          .send(employee)
          .end((err, res) => {
                (res).should.have.status(200);
                done();
                
             });
    });
  
});