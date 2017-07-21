#include<stdio.h>
#include<string.h>
#include<malloc.h>
struct node;
node *creat();//建立祖先
int add_child(node *head);//添加家庭成员
int add_brother(node *head);//添加兄弟成员
void print(node *head,char *x);//输出指定家庭成员
int beifen(node *p,char *x);//确定成员辈分
void print1(node *head);//先序遍历 输出家庭成员
void chengyuan(node *head,int s);//输出相应辈分成员
node *shanchu(node *head,char *s);//删除成员 

struct node//结构体变量
{
  char data[20];//家庭成员
  int n;//辈分
  node *lchild,*rchild;//左孩子是孩子，右孩子是兄弟
};

node *creat()//建立祖先
{
    node *head;
    head=(node *)malloc(sizeof(node));//分配存储空间
    char s[20];
    printf("输入祖先名字：");
    scanf("%s",&s);
    strcpy(head->data,s);// 赋值
    head->n=1;//分配辈分
    printf("祖先载入成功!\n");
    return head;//返回祖先节点(根节点)
}

int add_child(node *head)//添加家庭成员  非递归法
{
            char y[20],x[20];
            node *p,*q;//定义新变量
            q=head;
            printf("输入加入父节点姓名:");
            scanf("%s",&x);//输入父节点
            p=(node *)malloc(sizeof(node));//动态分配存储空间
            printf("输入要添加的孩子:");
            scanf("%s",&y);//输入孩子信息
            strcpy(p->data,y);//赋值到节点
            p->lchild=NULL;//新节点左孩子为空
            p->rchild=NULL;//新节点右孩子为空
            while(q!=NULL)//循环左孩子查找  
            {
                if(strcmp(x,q->data)==0)//比较
                {
                    if(q->lchild==NULL)//如果此结点没有孩子则添加到左孩子
                    {
                        p->n=q->n+1;//孩子为父节点的辈分加1
                        q->lchild=p;//新节点为父节点的左孩子节点
                        return 1;
                    }
                    else//如果此结点有孩子，则找到孩子，再找到最后一个兄弟，并添加到后面
                    {
                        q=q->lchild;
                           while(q->rchild!=NULL)//循环到最后一个
                           {
                              q=q->rchild;//兄弟指向右孩子
                           }
                           p->n=q->n;//兄弟辈分相同
                           q->rchild=p;//新节点为父节点的左孩子节点
                           return 1;
                       }
               }
               q=q->lchild;//指向左孩子
           }
           q=head;
           while(q!=NULL)//循环右孩子查找 
            {
                if(strcmp(x,q->data)==0)//比较
                {
                    if(q->lchild==NULL)//如果此结点没有孩子则添加到左孩子
                    {
                        p->n=q->n+1;//孩子为父节点的辈分加1
                        q->lchild=p;//新节点为父节点的左孩子节点
                        return 1;
                    }
                    else//如果此结点有孩子，则找到孩子，再找到最后一个兄弟，并添加到后面
                    {
                        q=q->lchild;
                           while(q->rchild!=NULL)//循环到最后一个
                           {
                              q=q->rchild;//兄弟指向右孩子
                           }
                           p->n=q->n;//兄弟辈分相同
                           q->rchild=p;//新节点为父节点的左孩子节点
                           return 1;
                       }
               }
               q=q->rchild;//指向右孩子
           }
}

int add_brother(node *head)//添加兄弟成员  非递归法
{
        node *p,*s; //定义新变量
        char y[20],x[20];
        p=head;
        s=(node *)malloc(sizeof(node));//动态分配存储空间
        printf("输入加入兄弟节点姓名");
        scanf("%s",&x);//输入兄弟节点姓名                                                                                        
        printf("请输入要添加的兄弟:");
        scanf("%s",&y);//输入添加信息
        strcpy(s->data,y);//赋值
        s->lchild=NULL;//新节点左孩子为空
        s->rchild=NULL;//新节点右孩子为空
        while(1)//循环左孩子查找 
        {
            if(strcmp(p->data,x)==0)//比较
            {
                if(p->rchild==NULL)//如果兄弟节点为空，赋给兄弟节点
                {
                    s->n=p->n;//兄弟辈分相同
                    p->rchild=s;//兄弟为右孩子
                    return 1;
                }
                else//否则找到最后一个兄弟，在其后添加结点
                {
                    while(p->rchild!=NULL)//循环到最后节点
                    {
                        p=p->rchild;//指向下一个右孩子
                    }
                    s->n=p->n;//兄弟辈分相同
                    p->rchild=s;//兄弟为右孩子
                    return 1;
                }
            }
          p=p->lchild;//指向左孩子
      }
      p=head;
      while(1)//循环右孩子查找 
        {
            if(strcmp(p->data,x)==0)//比较
            {
                if(p->rchild==NULL)//如果兄弟节点为空，赋给兄弟节点
                {
                    s->n=p->n;//兄弟辈分相同
                    p->rchild=s;//兄弟为右孩子
                    return 1;
                }
                else//否则找到最后一个兄弟，在其后添加结点
                {
                    while(p->rchild!=NULL)//循环到最后节点
                    {
                        p=p->rchild;//指向下一个右孩子
                    }
                    s->n=p->n;//兄弟辈分相同
                    p->rchild=s;//兄弟为右孩子
                    return 1;
                }
            }
          p=p->rchild;//指向右孩子
      }
}

void print(node *head,char *x)//输出指定家庭成员   递归法
{
    if(head!=NULL)
    {
        if(strcmp(head->data,x)==0)//查找
        {
            if(strcmp(head->data,"0")!=0)//比较
            printf("%s-",head->data);//找到后先输出该成员，再调用函数输出其子孙
            if(head->lchild!=NULL)
            {
              head=head->lchild;
              print1(head);//调用函数，输出孩子节点
            }
        }
        print(head->lchild,x);//递归
        print(head->rchild,x);//递归
    }
}

int beifen(node *p,char *x)//确定成员辈分   递归法
{
    if(p!=NULL)
    {
        if(strcmp(p->data,x)==0&&strcmp(p->data,"0")!=0)//如果找到且不为字符 0 则输出
        {
            printf("%d",p->n);//输出
            return 1;
        }
        beifen(p->lchild,x);//递归
        beifen(p->rchild,x);//递归
    }
}

void print1(node *head)//先序遍历 输出家庭成员    递归法
{
    if(head!=NULL)
    {
        if(strcmp(head->data,"0")!=0)//判断是否为空
        printf("-%s-",head->data);//输出
        print1(head->lchild);//递归
        print1(head->rchild);//递归
    }
}

void chengyuan(node *head,int s)//输出相应辈分成员   递归法
{
    if(head!=NULL)
    {
        if(head->n==s)//找到后且该成员未被删除  则输出
        {
           if(strcmp(head->data,"0")!=0)//查找
           printf("-%s-",head->data);//输出
        }
        chengyuan(head->lchild,s);//递归
        chengyuan(head->rchild,s);//递归
    }
}

node *shanchu(node *head,char *s)//其实未删除，只是将其姓名设为字符 0   递归法
{
    if(head!=NULL)
    {
        if(strcmp(head->data,s)==0)//比较找到
           strcpy(head->data,"0");//值归0
        shanchu(head->lchild,s);//递归
        shanchu(head->rchild,s);//递归
    }
}

void caidan()//菜单
{
        printf("*        1.设立家谱祖先          *\n");
        printf("*        2.添加家庭成员（孩子）  *\n");
        printf("*        3.添加家庭成员（兄弟）  *\n");
        printf("*        4.输出指定家庭成员      *\n");
        printf("*        5.确定成员辈分          *\n");
        printf("*        6.输出指定辈的所有成员  *\n");
        printf("*        7.删除家庭成员          *\n");
        printf("*        0.退出                  *\n");
}

int main()//主函数
{
    node *head;//定义头节点
    int n,m;
    char s[20];
    printf("\n******家谱(孩子兄弟表示法)********\n");
    while(1)
    {
        caidan();
        printf("输入选项:");
        scanf("%d",&m);//输入选项
        if(m==1)//创建祖先
        {
            head=creat();//调用函数
        }
        if(m==2)//添加孩子
        {
            add_child(head);//调用函数
        }
        if(m==3)//添加兄弟
        {
            add_brother(head);//调用函数
        }
        if(m==4)//输出一个家庭成员
        {
            printf("请输入父亲节点:");
            scanf("%s",&s);
            printf("\n成员为: ");
            print(head,s);//调用函数
            printf("\n");
        }
        if(m==5)//确定某人辈分
        {
            printf("请输入姓名:");
            scanf("%s",&s);
            printf("辈分为:");
            beifen(head,s);//调用函数
            printf("\n");
        }
        if(m==6)//输出指定辈分中所有人
        {
            printf("请输入辈分:");
            scanf("%d",&n);
            printf("\n成员为: ");
            chengyuan(head,n);//调用函数
            printf("\n");
        }
        if(m==7)//删除成员
        {
            printf("请输入要删除的成员:");
            scanf("%s",&s);
            shanchu(head,s);//调用函数
        }
        if(m==0)//退出
        {
          printf("谢谢使用家谱系统!\n");
          break;
          }
    }
}