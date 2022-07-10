#include<bits/stdc++.h>
using namespace std;

int power(int n,int m){

    if(m==1){
        return n;
    }

    int partialAns = power(n,m-1);
    return n*partialAns;
}

int main(){
 cout<<power(3,5);
}