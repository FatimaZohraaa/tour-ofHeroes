import { TestBed } from '@angular/core/testing';
import { MessagesService } from './messages.service';

describe('MessagesService', () => {
  let messagesService: MessagesService;
  let messagesList: string[];
  let initialLengthOfList: number;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [MessagesService] });
    messagesService = TestBed.inject(MessagesService);
    messagesList = messagesService.getMessages();
    initialLengthOfList = messagesList.length;
  });

  it('should be created', () => {
    expect(messagesService).toBeTruthy();
  });

  it('should return the messages list', () => {
    expect(messagesService.getMessages()).toEqual(messagesService.messages);
  });

  it('should add a message', () => {
    const messageToAdd = 'test message added';
    messagesService.addMessage(messageToAdd);
    expect(messagesList.length).toEqual(initialLengthOfList + 1);
    expect(messagesList.indexOf(messageToAdd)).not.toEqual(-1);
  });

  it('should clear messages', () => {
    messagesService.clearMessages();
    expect(messagesService.getMessages().length).toEqual(0);
  });
});
