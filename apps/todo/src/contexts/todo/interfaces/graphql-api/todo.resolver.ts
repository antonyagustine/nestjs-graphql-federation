import { Resolver, ResolveField, Parent } from '@nestjs/graphql';

import { Assignee, TodoDTO } from '../../application/dto/task.output';

@Resolver(() => TodoDTO)
export class TodoResolver {
  @ResolveField(() => Assignee, { nullable: true })
  assignee(@Parent() todo: TodoDTO): any {
    console.log('Assignee', todo.assigneeId);
    return { __typename: 'Assignee', userId: todo.assigneeId };
  }
}
