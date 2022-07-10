#include<bits/stdc++.h>
using namespace std;

int power(int n,int m){

    if(m==0){
        return 1;
    }

   int temp = power(n,m/2);
   if(m%2==1) return temp*temp*n;
   return temp*temp;
}

int main(){
 cout<<power(3,5);
}