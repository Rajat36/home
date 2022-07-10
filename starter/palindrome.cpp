#include<iostream>
#include<string.h>
using namespace std;

// bool helper(int l , int r, string &s){

// if(l>=r) return true;
// if(s[l] != s[r]) return false;
// return helper(l+1,r-1,s);
     
// }

// bool palindrome(string &s){
//     return helper(0,s.size()-1,s);
// }

bool isPalindromeHelper(int l,int r,string &s)
{
    if(l>=r) return true;
    if(s[l]!=s[r]) return false;
    return isPalindromeHelper(l+1,r-1,s);

}
bool isPalindrome(string &s)
{
    return isPalindromeHelper(0,s.size()-1,s);
}

int main(){

 string s = "raar";
 cout<<isPalindrome(s);
 return 0;
}