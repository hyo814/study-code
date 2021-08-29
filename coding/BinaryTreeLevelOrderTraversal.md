<a href="https://leetcode.com/tag/tree/">전체 트리 문제 </a>  
<a href="https://leetcode.com/problems/binary-tree-level-order-traversal/description/">참고해야할 사이트</a>   

## (영어)
Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000 

## (해석)
이진 트리가 주어지면 노드 값의 레벨 순서 순회를 반환 합니다.  
왼쪽에서 오른쪽으로, 레벨별로 입니다.  
예제 1번을 기준으로 이야기를 한다면 입력은 [3,9,20,null,null,15,7] 이며 출력은 [[3],[9,20],[15,7]] 입니다. 
<a href='https://ifh.cc/v-QMGJ3i' target='_blank'><img src='https://ifh.cc/g/QMGJ3i.png' border='0'></a>  
이때 레벨의 순서는 3 , 9 와 20 그리고 마지막으로 null, null, 15 ,7의 형태의 구성으로 레벨을 볼 수 있습니다.  
왼쪽 순회를 기반으로 구성을 하게 된다면 출력은 이와 같습니다. 

우선 이진트리를 순회하는 방법은 preorder,inorder,postorder가 있습니다.
루트 방문 순서를 기반으로 하고 있습니다. 이를 기반으로 보면 왼쪽을 기반으로 하고 있으니 pre일 것으로 예상이 됩니다.

쓰레드 이진트리란?
이진 트리를 구성하다보면 null 포인터가 생기는데 이 널 포인터를 순회할때 사용하는 구조를 스레드 이진 트리라고 합니다. 왼쪽의 널포인터는 현재 노드 순회하기 전에 노드를 가리키고, 오른쪽의 노드는 현재노드를 순회하고 난 다음의 노드를 가리킵니다.

그리고 가장 처음 방문하는 노드의 왼쪽 널포인터, 가장 마지막에 방문하는 오른쪽 널포인트는 어느것도 가리키지 않으므로 헤드 노드를 만들어서 그것을 가리키도록 유도합니다.

장점으로는 순회를 한후 다음노드로 가기 위해 왔던 노드들을 다시 지나가기 위한 불필요한 작업을 제거 할 수 있습니다.


## (풀이) 주석(ㅇ)
```js


```

### 기타
- 이진트리 <a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC">1</a>
- 트리 순회 <a href="https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC">2</a>
- 스레드 이진트리 <a href="https://ko.wikipedia.org/wiki/%EC%8A%A4%EB%A0%88%EB%93%9C_%EC%9D%B4%EC%A7%84_%ED%8A%B8%EB%A6%AC'>3</a>

